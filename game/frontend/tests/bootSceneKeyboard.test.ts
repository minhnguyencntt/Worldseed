import { afterEach, beforeEach, describe, expect, it, vi, type Mock } from 'vitest';
import { BootScene } from '../src/phaser/BootScene';
import { useGameStore } from '../src/store/gameStore';
import { phaserToReact } from '../src/phaser/events';
import { buildScene, moveFocus } from '@game/engine/buildScene';

// Phaser is a browser canvas runtime; create() only needs Scene.events, Scene.input.keyboard and the SHUTDOWN constant.
vi.mock('phaser', () => ({
  default: {
    Scene: class {
      events = { once: vi.fn() };
      input = { keyboard: { on: vi.fn(), off: vi.fn() } };
    },
    Scenes: { Events: { SHUTDOWN: 'shutdown' } },
  },
}));

// Content is mocked so the test does not parse YAML or depend on authored scene data.
vi.mock('../src/runtime/content', () => ({
  scene: { id: 'bedroom', title: 'Bedroom', objects: [], dialogue: [], openingDialogue: [] },
  sceneSpec: { id: 'bedroom', objects: [] },
  manifest: { version: 1, assets: [] },
  world: { id: 'the-boys-room', startScene: 'bedroom' },
}));

// buildScene and moveFocus are mocked so the scene holds exactly one fake object and focus movement is observable.
vi.mock('@game/engine/buildScene', () => ({ buildScene: vi.fn(), moveFocus: vi.fn() }));
vi.mock('@game/engine/buildEffects', () => ({ buildEffects: vi.fn(() => []) }));
vi.mock('@game/engine/playSceneTransition', () => ({ playSceneTransition: vi.fn() }));
vi.mock('../src/phaser/renderContext', () => ({ createPhaserRenderContext: vi.fn(() => ({})) }));
vi.mock('../src/phaser/effectContext', () => ({ createPhaserEffectContext: vi.fn(() => ({})) }));

type KeyHandler = (e: KeyboardEvent) => void;
type FakeScene = { input: { keyboard: { on: Mock; off: Mock } }; events: { once: Mock } };

const makeFakeObject = () => ({
  sync: vi.fn(),
  destroy: vi.fn(),
  onInteract: vi.fn(),
  handleKey: vi.fn(),
  isFocused: true,
  spec: { id: 'bookshelf' },
});

describe('BootScene keyboard', () => {
  let boot: BootScene;
  let fake: ReturnType<typeof makeFakeObject>;
  let handler: KeyHandler;
  let emit: ReturnType<typeof vi.spyOn>;

  const scene = () => boot as unknown as FakeScene;

  // Dispatches a synthetic keydown through the handler that create() registered with the keyboard plugin.
  const press = (key: string, shiftKey = false) =>
    handler({ key, shiftKey, preventDefault: vi.fn() } as unknown as KeyboardEvent);

  beforeEach(() => {
    vi.clearAllMocks();
    fake = makeFakeObject();
    vi.mocked(buildScene).mockReturnValue([fake] as unknown as ReturnType<typeof buildScene>);
    useGameStore.setState({ state: null });
    emit = vi.spyOn(phaserToReact, 'emit');
    boot = new BootScene();
    boot.create();
    const registration = scene().input.keyboard.on.mock.calls.find(([event]) => event === 'keydown');
    handler = registration?.[1] as KeyHandler;
  });

  afterEach(() => {
    // Run the SHUTDOWN handler registered in create() so the keyboard and store subscriptions are released between tests.
    const shutdown = scene().events.once.mock.calls.find(([event]) => event === 'shutdown');
    shutdown?.[1]?.();
    emit.mockRestore();
    useGameStore.setState({ state: null });
  });

  it('registers a callable keydown handler on the keyboard plugin during create', () => {
    expect(scene().input.keyboard.on).toHaveBeenCalledWith('keydown', expect.any(Function));
    expect(typeof handler).toBe('function');
  });

  it('moves focus forward and emits focusChange with the focused object id when Tab is pressed', () => {
    const event = { key: 'Tab', shiftKey: false, preventDefault: vi.fn() } as unknown as KeyboardEvent;
    handler(event);

    expect(moveFocus).toHaveBeenCalledWith([fake], 1);
    expect(event.preventDefault).toHaveBeenCalled();
    expect(emit).toHaveBeenCalledWith('focusChange', { id: 'bookshelf' });
  });

  it('moves focus backward when Shift+Tab is pressed', () => {
    press('Tab', true);

    expect(moveFocus).toHaveBeenCalledWith([fake], -1);
    expect(emit).toHaveBeenCalledWith('focusChange', { id: 'bookshelf' });
  });

  it('moves focus backward when ArrowLeft is pressed', () => {
    press('ArrowLeft');

    expect(moveFocus).toHaveBeenCalledWith([fake], -1);
    expect(emit).toHaveBeenCalledWith('focusChange', { id: 'bookshelf' });
  });

  it('moves focus forward when ArrowRight is pressed', () => {
    press('ArrowRight');

    expect(moveFocus).toHaveBeenCalledWith([fake], 1);
    expect(emit).toHaveBeenCalledWith('focusChange', { id: 'bookshelf' });
  });

  it('forwards Enter to the focused object handleKey', () => {
    press('Enter');

    expect(fake.handleKey).toHaveBeenCalledWith('Enter');
    expect(moveFocus).not.toHaveBeenCalled();
  });

  it('forwards Space to the focused object handleKey', () => {
    press(' ');

    expect(fake.handleKey).toHaveBeenCalledWith(' ');
    expect(moveFocus).not.toHaveBeenCalled();
  });

  it('emits menuClose to React when Escape is pressed', () => {
    press('Escape');

    expect(emit).toHaveBeenCalledWith('menuClose', {});
    expect(moveFocus).not.toHaveBeenCalled();
    expect(fake.handleKey).not.toHaveBeenCalled();
  });

  it('removes the same keydown handler from the keyboard plugin when the scene shuts down', () => {
    const shutdown = scene().events.once.mock.calls.find(([event]) => event === 'shutdown');
    expect(shutdown).toBeDefined();

    shutdown?.[1]?.();

    expect(scene().input.keyboard.off).toHaveBeenCalledWith('keydown', handler);
  });
});
