import { afterEach, beforeEach, describe, expect, it, vi, type Mock } from 'vitest';
import { BootScene } from '../src/phaser/BootScene';
import { useGameStore } from '../src/store/gameStore';
import { createInitialState } from '@game/state/gameState';
import { buildScene, moveFocus } from '@game/engine/buildScene';
import { scene as sceneSpecFixture, world as worldFixture } from '../src/runtime/content';

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

// buildScene and moveFocus are mocked so the scene holds two fake objects and focus application is observable.
vi.mock('@game/engine/buildScene', () => ({ buildScene: vi.fn(), moveFocus: vi.fn() }));
vi.mock('@game/engine/buildEffects', () => ({ buildEffects: vi.fn(() => []), destroyEffects: vi.fn() }));
vi.mock('@game/engine/playSceneTransition', () => ({ playSceneTransition: vi.fn() }));
vi.mock('../src/phaser/renderContext', () => ({ createPhaserRenderContext: vi.fn(() => ({})) }));
vi.mock('../src/phaser/effectContext', () => ({ createPhaserEffectContext: vi.fn(() => ({})) }));

type FakeScene = { input: { keyboard: { on: Mock; off: Mock } }; events: { once: Mock } };

const makeFakeObject = (id: string) => ({
  sync: vi.fn(),
  destroy: vi.fn(),
  onInteract: vi.fn(),
  onHoverChange: vi.fn(),
  handleKey: vi.fn(),
  focus: vi.fn(),
  blur: vi.fn(),
  isFocused: false,
  spec: { id },
});

describe('BootScene store focus apply', () => {
  let boot: BootScene;
  let bookshelf: ReturnType<typeof makeFakeObject>;
  let bed: ReturnType<typeof makeFakeObject>;

  const scene = () => boot as unknown as FakeScene;

  beforeEach(() => {
    vi.clearAllMocks();
    bookshelf = makeFakeObject('bookshelf');
    bed = makeFakeObject('bed');
    vi.mocked(buildScene).mockReturnValue([bookshelf, bed] as unknown as ReturnType<typeof buildScene>);
    // Seed a non-null game state so onStateChange reaches applyFocusedObject on every store update.
    useGameStore.setState({ state: createInitialState(worldFixture, sceneSpecFixture), focusedObjectId: null });
    boot = new BootScene();
    boot.create();
  });

  afterEach(() => {
    // Run the SHUTDOWN handler registered in create() so the store subscription is released between tests.
    const shutdown = scene().events.once.mock.calls.find(([event]) => event === 'shutdown');
    shutdown?.[1]?.();
    useGameStore.setState({ state: null, focusedObjectId: null });
  });

  it('focuses the object matching focusedObjectId', () => {
    useGameStore.getState().setFocusedObject('bookshelf');

    expect(bookshelf.focus).toHaveBeenCalledTimes(1);
    expect(bed.focus).not.toHaveBeenCalled();
  });

  it('blurs a previously focused object and ignores unknown ids', () => {
    bed.isFocused = true;

    useGameStore.getState().setFocusedObject('bookshelf');
    expect(bed.blur).toHaveBeenCalled();

    const focusCalls = bookshelf.focus.mock.calls.length + bed.focus.mock.calls.length;
    expect(() => useGameStore.getState().setFocusedObject('missing')).not.toThrow();
    expect(bookshelf.focus.mock.calls.length + bed.focus.mock.calls.length).toBe(focusCalls);
    expect(moveFocus).not.toHaveBeenCalled();
  });
});
