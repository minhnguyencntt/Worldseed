import { beforeEach, describe, expect, it, vi } from 'vitest';
import { buildScene } from '@game/engine/buildScene';
import { BootScene } from '../src/phaser/BootScene';
import { createInputLayer } from '../src/phaser/input';
import { createPhaserRenderContext } from '../src/phaser/renderContext';

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

// Engine object construction and the render context are replaced with spies; the real build delegate runs on top of them.
vi.mock('@game/engine/buildScene', () => ({ buildScene: vi.fn(() => []) }));
vi.mock('../src/phaser/renderContext', () => ({ createPhaserRenderContext: vi.fn(() => ({})) }));
vi.mock('../src/phaser/characters', () => ({ createCharacters: vi.fn(() => ({ dispose: vi.fn(), play: vi.fn(), sprites: [] })) }));
vi.mock('../src/phaser/input', () => ({
  createInputLayer: vi.fn(() => ({ destroy: vi.fn(), bindCharacter: vi.fn(), bindObject: vi.fn() })),
}));
vi.mock('@game/engine/buildEffects', () => ({ buildEffects: vi.fn(() => []), destroyEffects: vi.fn() }));
vi.mock('@game/engine/playSceneTransition', () => ({ playSceneTransition: vi.fn() }));
vi.mock('../src/phaser/effectContext', () => ({ createPhaserEffectContext: vi.fn(() => ({})) }));

describe('BootScene scene build wiring', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('builds the scene through the build delegate, which creates the Phaser render context once', () => {
    const boot = new BootScene();

    boot.create();

    expect(createPhaserRenderContext).toHaveBeenCalledTimes(1);
    expect(vi.mocked(createPhaserRenderContext).mock.calls[0][0]).toBe(boot);
  });

  it('hands the engine-built scene objects to the input layer', () => {
    const objects = [{ id: 'bed' }];
    vi.mocked(buildScene).mockReturnValueOnce(objects as never);
    const boot = new BootScene();

    boot.create();

    expect(vi.mocked(createInputLayer).mock.calls[0][1]).toBe(objects);
  });
});
