import { afterEach, beforeEach, describe, expect, it, vi, type Mock } from 'vitest';
import { BootScene } from '../src/phaser/BootScene';
import { useGameStore } from '../src/store/gameStore';
import { createInitialState } from '@game/state/gameState';
import { buildScene } from '@game/engine/buildScene';
import { scene as sceneSpecFixture, world as worldFixture } from '../src/runtime/content';

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

// buildScene is mocked so the scene holds exactly one fake object whose focus state is observable.
vi.mock('@game/engine/buildScene', () => ({ buildScene: vi.fn(), moveFocus: vi.fn() }));
vi.mock('@game/engine/buildEffects', () => ({ buildEffects: vi.fn(() => []), destroyEffects: vi.fn() }));
vi.mock('@game/engine/playSceneTransition', () => ({ playSceneTransition: vi.fn() }));
vi.mock('../src/phaser/renderContext', () => ({ createPhaserRenderContext: vi.fn(() => ({})) }));
vi.mock('../src/phaser/effectContext', () => ({ createPhaserEffectContext: vi.fn(() => ({})) }));

type FakeScene = { input: { keyboard: { on: Mock; off: Mock } }; events: { once: Mock } };

const makeFakeObject = () => ({
  sync: vi.fn(),
  destroy: vi.fn(),
  onInteract: vi.fn(),
  onHoverChange: vi.fn(),
  handleKey: vi.fn(),
  focus: vi.fn(),
  blur: vi.fn(),
  isFocused: false,
  spec: { id: 'bookshelf' },
});

describe('BootScene store focus clear', () => {
  let boot: BootScene;
  let fake: ReturnType<typeof makeFakeObject>;

  const scene = () => boot as unknown as FakeScene;

  beforeEach(() => {
    vi.clearAllMocks();
    fake = makeFakeObject();
    vi.mocked(buildScene).mockReturnValue([fake] as unknown as ReturnType<typeof buildScene>);
    // Seed a non-null game state so onStateChange reaches applyFocusedObject on every store update.
    useGameStore.setState({ state: createInitialState(worldFixture, sceneSpecFixture), focusedObjectId: null });
    boot = new BootScene();
    boot.create();
    useGameStore.getState().setFocusedObject(null);
  });

  afterEach(() => {
    // Run the SHUTDOWN handler registered in create() so the store subscription is released between tests.
    const shutdown = scene().events.once.mock.calls.find(([event]) => event === 'shutdown');
    shutdown?.[1]?.();
    useGameStore.setState({ state: null, focusedObjectId: null });
  });

  it('clears focus when focusedObjectId becomes null', () => {
    useGameStore.getState().setFocusedObject('bookshelf');
    fake.isFocused = true;

    useGameStore.getState().setFocusedObject(null);

    expect(fake.blur).toHaveBeenCalledTimes(1);
  });

  it('does not blur when nothing is focused', () => {
    fake.isFocused = false;

    useGameStore.getState().setFocusedObject('x');
    useGameStore.getState().setFocusedObject(null);

    expect(fake.blur).not.toHaveBeenCalled();
  });
});
