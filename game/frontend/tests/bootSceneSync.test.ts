import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { BootScene } from '../src/phaser/BootScene';
import { useGameStore } from '../src/store/gameStore';
import { phaserToReact } from '../src/phaser/events';
import { createInitialState } from '@game/state/gameState';
import { buildScene } from '@game/engine/buildScene';

// Phaser is a browser canvas runtime; create() only needs Scene.events and the SHUTDOWN constant.
vi.mock('phaser', () => ({
  default: {
    Scene: class {
      events = { once: vi.fn() };
      tweens = { killAll: vi.fn() };
      anims = { remove: vi.fn() };
      textures = { remove: vi.fn() };
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

// buildScene is mocked so the scene holds exactly one fake object whose sync/destroy/onInteract are spies.
vi.mock('@game/engine/buildScene', () => ({ buildScene: vi.fn() }));
vi.mock('@game/engine/buildEffects', () => ({ buildEffects: vi.fn(() => []), destroyEffects: vi.fn() }));
vi.mock('@game/engine/playSceneTransition', () => ({ playSceneTransition: vi.fn() }));
vi.mock('../src/phaser/renderContext', () => ({ createPhaserRenderContext: vi.fn(() => ({})) }));
vi.mock('../src/phaser/effectContext', () => ({ createPhaserEffectContext: vi.fn(() => ({})) }));

const world = { id: 'the-boys-room', startScene: 'bedroom' } as Parameters<typeof createInitialState>[0];
const scene = { id: 'bedroom', title: 'Bedroom', objects: [], dialogue: [], openingDialogue: [] } as unknown as Parameters<
  typeof createInitialState
>[1];

const makeFakeObject = () => ({
  sync: vi.fn(),
  destroy: vi.fn(),
  onInteract: vi.fn(),
  onHoverChange: vi.fn(),
});

describe('BootScene state sync', () => {
  let boot: BootScene;
  let fake: ReturnType<typeof makeFakeObject>;

  beforeEach(() => {
    fake = makeFakeObject();
    vi.mocked(buildScene).mockReturnValue([fake] as unknown as ReturnType<typeof buildScene>);
    useGameStore.setState({ state: null });
    boot = new BootScene();
  });

  afterEach(() => {
    // Run the SHUTDOWN handler registered in create() so the store subscription is released between tests.
    const shutdown = (boot.events.once as unknown as ReturnType<typeof vi.fn>).mock.calls.find(
      ([event]) => event === 'shutdown',
    );
    shutdown?.[1]?.();
    useGameStore.setState({ state: null });
  });

  it('syncs scene objects with the store state on create and on each state change, and ignores a null state', () => {
    const first = createInitialState(world, scene);
    useGameStore.setState({ state: first });

    boot.create();

    expect(fake.sync).toHaveBeenCalledWith(first);

    const second = { ...first, flags: { opened: true } };
    useGameStore.setState({ state: second });
    boot.onStateChange();

    expect(fake.sync).toHaveBeenLastCalledWith(second);

    const callsBeforeNull = fake.sync.mock.calls.length;
    useGameStore.setState({ state: null });
    boot.onStateChange();

    expect(fake.sync.mock.calls.length).toBe(callsBeforeNull);
  });

  it('forwards an object interaction to React as objectClick with the object id', () => {
    const emit = vi.spyOn(phaserToReact, 'emit');
    useGameStore.setState({ state: createInitialState(world, scene) });

    boot.create();

    const onInteractCb = fake.onInteract.mock.calls[0][0] as (e: { objectId: string; actions: unknown[] }) => void;
    onInteractCb({ objectId: 'abc', actions: [] });

    expect(emit).toHaveBeenCalledWith('objectClick', { id: 'abc' });
  });
});
