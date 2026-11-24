import { afterEach, beforeEach, describe, expect, it, vi, type Mock } from 'vitest';
import { BootScene } from '../src/phaser/BootScene';
import { useGameStore } from '../src/store/gameStore';
import { phaserToReact } from '../src/phaser/events';
import { buildScene } from '@game/engine/buildScene';

// Phaser is a browser canvas runtime; create() only needs Scene.events, Scene.input.keyboard and the SHUTDOWN constant.
vi.mock('phaser', () => ({
  default: {
    Scene: class {
      events = { once: vi.fn() };
      tweens = { killAll: vi.fn() };
      cameras = { main: { off: vi.fn() } };
      input = { keyboard: { on: vi.fn(), off: vi.fn() } };
    },
    Scenes: { Events: { SHUTDOWN: 'shutdown' } },
    Cameras: { Scene2D: { Events: { FADE_OUT_COMPLETE: 'camerafadeoutcomplete' } } },
  },
}));

// Content is mocked so the test does not parse YAML or depend on authored scene data.
vi.mock('../src/runtime/content', () => ({
  scene: { id: 'bedroom', title: 'Bedroom', objects: [], dialogue: [], openingDialogue: [] },
  sceneSpec: { id: 'bedroom', objects: [] },
  manifest: { version: 1, assets: [] },
  world: { id: 'the-boys-room', startScene: 'bedroom' },
}));

// Only buildScene is replaced, so the scene holds one fake object; moveFocus stays real and moves focus through the fake's focus/blur.
vi.mock('@game/engine/buildScene', async (orig) => ({
  ...(await orig<typeof import('@game/engine/buildScene')>()),
  buildScene: vi.fn(),
}));
vi.mock('@game/engine/buildEffects', () => ({ buildEffects: vi.fn(() => []), destroyEffects: vi.fn() }));
vi.mock('@game/engine/playSceneTransition', () => ({ playSceneTransition: vi.fn() }));
vi.mock('../src/phaser/renderContext', () => ({ createPhaserRenderContext: vi.fn(() => ({})) }));
vi.mock('../src/phaser/effectContext', () => ({ createPhaserEffectContext: vi.fn(() => ({})) }));

type KeyHandler = (e: KeyboardEvent) => void;
type FakeScene = { input: { keyboard: { on: Mock; off: Mock } }; events: { once: Mock } };

// Fake scene object: focus/blur flip an isFocused flag, so moveFocus and the input layer see real focus state.
const makeFakeObject = () => {
  const focusState = { isFocused: false };
  return {
    spec: { id: 'bookshelf' },
    isVisible: true,
    get isFocused(): boolean {
      return focusState.isFocused;
    },
    sync: vi.fn(),
    destroy: vi.fn(),
    onInteract: vi.fn(),
    onHoverChange: vi.fn(),
    handleKey: vi.fn(),
    focus: vi.fn(() => {
      focusState.isFocused = true;
    }),
    blur: vi.fn(() => {
      focusState.isFocused = false;
    }),
  };
};

describe('BootScene keyboard', () => {
  let boot: BootScene;
  let fake: ReturnType<typeof makeFakeObject>;
  let handler: KeyHandler;
  let emit: ReturnType<typeof vi.spyOn>;

  const scene = () => boot as unknown as FakeScene;

  // Dispatches a synthetic keydown through the handler that create() registered with the keyboard plugin.
  const press = (key: string, shiftKey = false) =>
    handler({ key, shiftKey, preventDefault: vi.fn() } as unknown as KeyboardEvent);

  const shutdownHandler = () => scene().events.once.mock.calls.find(([event]) => event === 'shutdown')?.[1] as
    | (() => void)
    | undefined;

  beforeEach(() => {
    vi.clearAllMocks();
    fake = makeFakeObject();
    vi.mocked(buildScene).mockReturnValue([fake] as unknown as ReturnType<typeof buildScene>);
    useGameStore.setState({ state: null, focusedObjectId: null });
    emit = vi.spyOn(phaserToReact, 'emit');
    boot = new BootScene();
    boot.create();
    const registration = scene().input.keyboard.on.mock.calls.find(([event]) => event === 'keydown');
    handler = registration?.[1] as KeyHandler;
  });

  afterEach(() => {
    // Run the SHUTDOWN handler registered in create() so the keyboard and store subscriptions are released between tests.
    shutdownHandler()?.();
    emit.mockRestore();
    useGameStore.setState({ state: null, focusedObjectId: null });
  });

  it('registers a callable keydown handler on the keyboard plugin during create', () => {
    expect(scene().input.keyboard.on).toHaveBeenCalledWith('keydown', expect.any(Function));
    expect(typeof handler).toBe('function');
  });

  it('moves focus forward and emits focusChange with the focused object id when Tab is pressed', () => {
    const event = { key: 'Tab', shiftKey: false, preventDefault: vi.fn() } as unknown as KeyboardEvent;
    handler(event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(fake.isFocused).toBe(true);
    expect(emit).toHaveBeenCalledWith('focusChange', { id: 'bookshelf' });
    expect(useGameStore.getState().focusedObjectId).toBe('bookshelf');
  });

  it('moves focus backward when Shift+Tab is pressed', () => {
    press('Tab', true);

    expect(fake.isFocused).toBe(true);
    expect(emit).toHaveBeenCalledWith('focusChange', { id: 'bookshelf' });
    expect(useGameStore.getState().focusedObjectId).toBe('bookshelf');
  });

  it('moves focus backward when ArrowLeft is pressed', () => {
    press('ArrowLeft');

    expect(fake.isFocused).toBe(true);
    expect(emit).toHaveBeenCalledWith('focusChange', { id: 'bookshelf' });
    expect(useGameStore.getState().focusedObjectId).toBe('bookshelf');
  });

  it('moves focus forward when ArrowRight is pressed', () => {
    press('ArrowRight');

    expect(fake.isFocused).toBe(true);
    expect(emit).toHaveBeenCalledWith('focusChange', { id: 'bookshelf' });
    expect(useGameStore.getState().focusedObjectId).toBe('bookshelf');
  });

  it('forwards Enter to the focused object handleKey without moving focus', () => {
    press('Enter');

    expect(fake.handleKey).toHaveBeenCalledWith('Enter');
    expect(emit).not.toHaveBeenCalledWith('focusChange', expect.anything());
  });

  it('forwards Space to the focused object handleKey without moving focus', () => {
    press(' ');

    expect(fake.handleKey).toHaveBeenCalledWith(' ');
    expect(emit).not.toHaveBeenCalledWith('focusChange', expect.anything());
  });

  it('emits menuClose to React when Escape is pressed, without moving focus', () => {
    press('Escape');

    expect(emit).toHaveBeenCalledWith('menuClose', {});
    expect(emit).not.toHaveBeenCalledWith('focusChange', expect.anything());
    expect(fake.handleKey).not.toHaveBeenCalled();
  });

  it('removes the same keydown handler from the keyboard plugin when the scene shuts down', () => {
    const shutdown = shutdownHandler();
    expect(shutdown).toBeDefined();

    shutdown?.();

    expect(scene().input.keyboard.off).toHaveBeenCalledWith('keydown', handler);
  });

  it('after shutdown a keydown emits nothing', () => {
    shutdownHandler()?.();
    emit.mockClear();

    press('Tab');

    expect(emit).not.toHaveBeenCalledWith('focusChange', expect.anything());
  });
});
