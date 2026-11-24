import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createInitialState } from '@game/state/gameState';
import { buildEffects, destroyEffects } from '@game/engine/buildEffects';
import { playSceneTransition } from '@game/engine/playSceneTransition';
import { useGameStore } from '../src/store/gameStore';
import { BootScene } from '../src/phaser/BootScene';
import { createPhaserEffectContext, type ResolveKey } from '../src/phaser/effectContext';
import { scene, world } from '../src/runtime/content';

// Phaser is a browser canvas runtime; the scene only needs Scene.events and the SHUTDOWN constant.
vi.mock('phaser', () => ({
  default: {
    Scene: class {
      events = { once: vi.fn() };
      // A real Phaser scene always has input; no keyboard plugin is needed for these tests.
      input = { keyboard: null };
    },
    Scenes: { Events: { SHUTDOWN: 'shutdown' } },
  },
}));

// Content is mocked so the test does not parse YAML or depend on authored scene data.
vi.mock('../src/runtime/content', () => ({
  world: { id: 'the-boys-room', title: 'The Boys Room', startScene: 'bedroom', scenes: [], characters: [], flags: [] },
  scene: { id: 'bedroom', title: 'Bedroom', objects: [], layers: [], effects: [] },
  sceneSpec: { id: 'bedroom', objects: [], layers: [], effects: [] },
  manifest: { version: 1, assets: [] },
}));

// The effect builder is an engine module; BootScene only wires it, so it is replaced with fake handles.
// destroyEffects keeps the real teardown behaviour but is a spy so the SHUTDOWN test can assert its arguments.
vi.mock('@game/engine/buildEffects', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@game/engine/buildEffects')>();
  return {
    buildEffects: vi.fn(),
    destroyEffects: vi.fn(actual.destroyEffects),
  };
});

// The transition helper drives the camera; BootScene only calls it, so it is replaced with a fake.
vi.mock('@game/engine/playSceneTransition', () => ({
  playSceneTransition: vi.fn(),
}));

const makeState = () => createInitialState(world, scene);

describe('BootScene effects', () => {
  beforeEach(() => {
    useGameStore.setState({ state: null });
    vi.mocked(buildEffects).mockReset();
    vi.mocked(destroyEffects).mockClear();
    vi.mocked(playSceneTransition).mockReset();
  });

  it('builds the scene effects from the bundled bedroom scene when create() runs', () => {
    useGameStore.setState({ state: makeState() });
    vi.mocked(buildEffects).mockReturnValue([]);
    const boot = new BootScene();

    boot.create();

    expect(buildEffects).toHaveBeenCalledTimes(1);
    const [ctx, sceneArg] = vi.mocked(buildEffects).mock.calls[0];
    expect(sceneArg).toBe(scene);
    expect(typeof ctx.createEffect).toBe('function');
    expect(typeof ctx.playTransition).toBe('function');
  });

  it('plays the authored transition when create() runs', () => {
    useGameStore.setState({ state: makeState() });
    vi.mocked(buildEffects).mockReturnValue([]);
    const boot = new BootScene();

    boot.create();

    expect(playSceneTransition).toHaveBeenCalledTimes(1);
    const [ctx, sceneArg] = vi.mocked(playSceneTransition).mock.calls[0];
    expect(typeof ctx.playTransition).toBe('function');
    expect(sceneArg).toBe(scene);
  });

  it('destroys every effect handle returned by buildEffects when the SHUTDOWN callback runs', () => {
    useGameStore.setState({ state: makeState() });
    const handles = [{ destroy: vi.fn() }, { destroy: vi.fn() }];
    vi.mocked(buildEffects).mockReturnValue(handles);
    const boot = new BootScene();
    boot.create();
    const once = boot.events.once as unknown as ReturnType<typeof vi.fn>;
    const shutdownCall = once.mock.calls.find(([event]) => event === 'shutdown');
    expect(shutdownCall).toBeDefined();
    const onShutdown = shutdownCall?.[1] as () => void;

    onShutdown();

    for (const handle of handles) {
      expect(handle.destroy).toHaveBeenCalledTimes(1);
    }
  });

  it('passes the handles returned by buildEffects to destroyEffects when the SHUTDOWN callback runs', () => {
    // Given buildEffects returns two handles during create()
    useGameStore.setState({ state: makeState() });
    const handles = [{ destroy: vi.fn() }, { destroy: vi.fn() }];
    vi.mocked(buildEffects).mockReturnValue(handles);
    const boot = new BootScene();
    boot.create();
    const once = boot.events.once as unknown as ReturnType<typeof vi.fn>;
    const shutdownCall = once.mock.calls.find(([event]) => event === 'shutdown');
    expect(shutdownCall).toBeDefined();
    const onShutdown = shutdownCall?.[1] as () => void;
    // When the SHUTDOWN callback fires
    onShutdown();
    // Then destroyEffects is called with exactly those handles
    expect(destroyEffects).toHaveBeenCalledWith(handles);
  });
});

describe('playTransition: fade-in and ambient layer on the Phaser scene', () => {
  const resolveKey: ResolveKey = vi.fn((id: string) => id);
  const makeFakeScene = () => {
    const rectangle = vi.fn(() => {
      const rect = {
        setOrigin: vi.fn(() => rect),
        setDepth: vi.fn(() => rect),
        destroy: vi.fn(),
      };
      return rect;
    });
    const particles = vi.fn();
    const fakeScene = {
      cameras: { main: { fadeIn: vi.fn() } },
      scale: { width: 800, height: 600 },
      add: { rectangle, particles },
    };
    return { fakeScene, rectangle };
  };

  it('playTransition(400) starts the main camera fade-in for 400 ms', () => {
    const { fakeScene } = makeFakeScene();
    const ctx = createPhaserEffectContext(fakeScene as never, resolveKey);

    ctx.playTransition(400);

    expect(fakeScene.cameras.main.fadeIn).toHaveBeenCalledWith(400);
  });

  it('createEffect for ambientLight adds a full-scene rectangle with the authored depth', () => {
    const { fakeScene, rectangle } = makeFakeScene();
    const ctx = createPhaserEffectContext(fakeScene as never, resolveKey);

    const handle = ctx.createEffect({ type: 'ambientLight', color: '#1a2b3c', alpha: 0.4, depth: 7 });

    expect(rectangle).toHaveBeenCalledWith(0, 0, 800, 600, parseInt('1a2b3c', 16), 0.4);
    const rect = rectangle.mock.results[0].value as { setDepth: ReturnType<typeof vi.fn> };
    expect(rect.setDepth).toHaveBeenCalledWith(7);
    expect(handle.destroy).toBeTypeOf('function');
  });
});
