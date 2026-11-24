import { beforeEach, describe, expect, it, vi } from 'vitest';
import { BootScene } from '../src/phaser/BootScene';
import { createSceneBuild } from '../src/phaser/buildScene';
import { createCharacters } from '../src/phaser/characters';
import { createInputLayer } from '../src/phaser/input';

// Phaser is a browser canvas runtime; create() only needs Scene.events, input and the SHUTDOWN constant.
vi.mock('phaser', () => ({
  default: {
    Scene: class {
      events = { once: vi.fn() };
      input = { keyboard: { on: vi.fn(), off: vi.fn() } };
    },
    Scenes: { Events: { SHUTDOWN: 'shutdown' } },
  },
}));

// Bundled content is replaced with a fixture so the test does not parse YAML or depend on authored data.
vi.mock('../src/runtime/content', () => ({
  scene: { id: 'bedroom', title: 'Bedroom', objects: [], dialogue: [], openingDialogue: [], characters: [] },
  sceneSpec: { id: 'bedroom', objects: [] },
  manifest: { version: 1, assets: [] },
  world: { id: 'the-boys-room', startScene: 'bedroom' },
}));

// Build, characters and input are collaborators outside BootScene; they are faked so only the wiring is observed.
vi.mock('../src/phaser/buildScene', () => ({ createSceneBuild: vi.fn() }));
vi.mock('../src/phaser/characters', () => ({ createCharacters: vi.fn() }));
vi.mock('../src/phaser/input', () => ({
  createInputLayer: vi.fn(() => ({ destroy: vi.fn(), bindCharacter: vi.fn(), bindObject: vi.fn() })),
}));
vi.mock('@game/engine/buildEffects', () => ({ buildEffects: vi.fn(() => []), destroyEffects: vi.fn() }));
vi.mock('@game/engine/playSceneTransition', () => ({ playSceneTransition: vi.fn() }));
vi.mock('../src/phaser/renderContext', () => ({ createPhaserRenderContext: vi.fn(() => ({})) }));
vi.mock('../src/phaser/effectContext', () => ({ createPhaserEffectContext: vi.fn(() => ({})) }));

describe('BootScene scene object wiring', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(createSceneBuild).mockReturnValue({
      objects: [{ id: 'bed' }],
      effects: [],
      effectContext: {},
      sync: vi.fn(),
      dispose: vi.fn(),
    } as unknown as ReturnType<typeof createSceneBuild>);
    vi.mocked(createCharacters).mockReturnValue({
      sprites: [],
      play: vi.fn(),
      dispose: vi.fn(),
    } as unknown as ReturnType<typeof createCharacters>);
  });

  it('routes the build scene objects to the input layer exactly once', () => {
    const boot = new BootScene();

    boot.create();

    expect(createInputLayer).toHaveBeenCalledTimes(1);
    const build = vi.mocked(createSceneBuild).mock.results[0].value as { objects: unknown[] };
    expect(vi.mocked(createInputLayer).mock.calls[0][1]).toBe(build.objects);
  });
});
