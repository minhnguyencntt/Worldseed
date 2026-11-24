import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { GameState } from '@game/state/types';
import { BootScene } from '../src/phaser/BootScene';
import { createSceneBuild } from '../src/phaser/buildScene';
import { createCharacters } from '../src/phaser/characters';
import { phaserToReact } from '../src/phaser/events';
import { useGameStore } from '../src/store/gameStore';

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

// Bundled content is replaced with a fixture so the test does not parse YAML or depend on authored data.
vi.mock('../src/runtime/content', () => ({
  scene: { id: 'bedroom', title: 'Bedroom', objects: [], dialogue: [], openingDialogue: [], characters: [] },
  sceneSpec: { id: 'bedroom', objects: [] },
  manifest: { version: 1, assets: [] },
  world: { id: 'the-boys-room', startScene: 'bedroom' },
}));

// The two delegated modules are replaced with spies so the test observes only what BootScene wires.
vi.mock('../src/phaser/buildScene', () => ({
  createSceneBuild: vi.fn(),
}));
vi.mock('../src/phaser/characters', () => ({
  createCharacters: vi.fn(),
}));

// Input and transition are engine-side collaborators outside this unit; they are faked so create() can run.
vi.mock('../src/phaser/input', () => ({
  createInputLayer: vi.fn(() => ({ destroy: vi.fn(), bindCharacter: vi.fn(), bindObject: vi.fn() })),
}));
vi.mock('@game/engine/buildEffects', () => ({ buildEffects: vi.fn(() => []), destroyEffects: vi.fn() }));
vi.mock('@game/engine/playSceneTransition', () => ({ playSceneTransition: vi.fn() }));
vi.mock('../src/phaser/renderContext', () => ({ createPhaserRenderContext: vi.fn(() => ({})) }));
vi.mock('../src/phaser/effectContext', () => ({ createPhaserEffectContext: vi.fn(() => ({})) }));

type FakeBuild = {
  objects: unknown[];
  effects: unknown[];
  effectContext: Record<string, never>;
  sync: ReturnType<typeof vi.fn>;
  dispose: ReturnType<typeof vi.fn>;
};
type FakeCharacters = { dispose: ReturnType<typeof vi.fn> };

const makeBuild = (): FakeBuild => ({
  objects: [],
  effects: [],
  effectContext: {},
  sync: vi.fn(),
  dispose: vi.fn(),
});

const makeCharacters = (): FakeCharacters => ({ dispose: vi.fn() });

describe('BootScene delegates build and characters', () => {
  let build: FakeBuild;
  let characters: FakeCharacters;

  beforeEach(() => {
    vi.clearAllMocks();
    build = makeBuild();
    characters = makeCharacters();
    vi.mocked(createSceneBuild).mockReturnValue(build as unknown as ReturnType<typeof createSceneBuild>);
    vi.mocked(createCharacters).mockReturnValue(characters as unknown as ReturnType<typeof createCharacters>);
    useGameStore.setState({ state: null, focusedObjectId: null });
  });

  it('delegates scene build and character creation when create() runs, and emits sceneReady', () => {
    const emitSpy = vi.spyOn(phaserToReact, 'emit');
    const boot = new BootScene();

    boot.create();

    expect(createSceneBuild).toHaveBeenCalledTimes(1);
    expect(createCharacters).toHaveBeenCalledTimes(1);
    expect(emitSpy).toHaveBeenCalledWith('sceneReady', { sceneId: 'boot' });
    emitSpy.mockRestore();
  });

  it('pushes the store state and focused object id into the build on state change', () => {
    const boot = new BootScene();
    boot.create();
    const state = { scene: 'bedroom' } as unknown as GameState;

    useGameStore.setState({ state, focusedObjectId: 'bed' });

    expect(build.sync).toHaveBeenCalledWith(state, 'bed');
  });

  it('disposes the build and the characters exactly once each when SHUTDOWN fires', () => {
    const boot = new BootScene();
    boot.create();

    const once = boot.events.once as unknown as ReturnType<typeof vi.fn>;
    const shutdown = once.mock.calls.find(([event]) => event === 'shutdown');
    expect(shutdown).toBeDefined();
    const onShutdown = shutdown![1] as () => void;
    onShutdown();

    expect(build.dispose).toHaveBeenCalledTimes(1);
    expect(characters.dispose).toHaveBeenCalledTimes(1);
  });
});
