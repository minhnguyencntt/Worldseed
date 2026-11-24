import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { GameState, SceneDef } from '@game/state/types';
import type { SceneSpec } from '@game/content/schema';
import type { SceneObject } from '@game/entities/SceneObject';
import { buildEffects, destroyEffects } from '@game/engine/buildEffects';
import { buildScene as buildEngineScene } from '@game/engine/buildScene';
import { createSceneBuild } from '../src/phaser/buildScene';
import { createPhaserEffectContext } from '../src/phaser/effectContext';
import { createPhaserRenderContext } from '../src/phaser/renderContext';

// Phaser is a browser canvas runtime; createSceneBuild only forwards the scene to the mocked factories below.
vi.mock('phaser', () => ({
  default: {
    Scene: class {},
  },
}));

// The Phaser-backed contexts are replaced so the test proves createSceneBuild wires them rather than building Phaser objects.
vi.mock('../src/phaser/effectContext', () => ({
  createPhaserEffectContext: vi.fn(),
}));

vi.mock('../src/phaser/renderContext', () => ({
  createPhaserRenderContext: vi.fn(() => ({ fake: 'render-context' })),
}));

// Engine construction is replaced with fake handles; the engine owns how objects and effects are built.
vi.mock('@game/engine/buildScene', () => ({
  buildScene: vi.fn(),
}));

vi.mock('@game/engine/buildEffects', () => ({
  buildEffects: vi.fn(() => []),
  // Snapshot the handles at call time: createSceneBuild empties its effects array during dispose.
  destroyEffects: vi.fn(),
}));

type FakeObject = {
  spec: { id: string };
  isFocused: boolean;
  sync: ReturnType<typeof vi.fn>;
  focus: ReturnType<typeof vi.fn>;
  blur: ReturnType<typeof vi.fn>;
  destroy: ReturnType<typeof vi.fn>;
};

const fakeObject = (id: string, isFocused = false): FakeObject => ({
  spec: { id },
  isFocused,
  sync: vi.fn(),
  focus: vi.fn(),
  blur: vi.fn(),
  destroy: vi.fn(),
});

const scene = {} as never;
const resolveKey = (id: string) => `key:${id}`;
const content = { id: 'fixture-scene' } as unknown as SceneDef;
const spec = { id: 'fixture-scene', objects: [] } as unknown as SceneSpec;
const state = { flags: {} } as unknown as GameState;

let bed: FakeObject;
let lamp: FakeObject;
let effectContext: { fake: 'effect-context' };

beforeEach(() => {
  vi.clearAllMocks();
  bed = fakeObject('bed');
  lamp = fakeObject('lamp');
  effectContext = { fake: 'effect-context' } as never;
  vi.mocked(createPhaserEffectContext).mockReturnValue(effectContext as never);
  vi.mocked(buildEngineScene).mockReturnValue([bed, lamp] as unknown as SceneObject[]);
  vi.mocked(buildEffects).mockReturnValue([]);
});

describe('createSceneBuild build', () => {
  it('returns objects and effects from the engine', () => {
    const effects = [{ destroy: vi.fn() }, { destroy: vi.fn() }];
    vi.mocked(buildEffects).mockReturnValue(effects);

    const build = createSceneBuild(scene, resolveKey, content, spec);

    expect(build.objects).toEqual([bed, lamp]);
    expect(build.effects).toEqual(effects);
    expect(build.effectContext).toBe(effectContext);
    expect(createPhaserEffectContext).toHaveBeenCalledWith(scene, resolveKey);
    expect(buildEffects).toHaveBeenCalledWith(effectContext, content);
    expect(createPhaserRenderContext).toHaveBeenCalledWith(scene, resolveKey);
    expect(buildEngineScene).toHaveBeenCalledWith({ fake: 'render-context' }, spec);
  });
});

describe('createSceneBuild sync', () => {
  it('sync focuses matching object', () => {
    const build = createSceneBuild(scene, resolveKey, content, spec);

    build.sync(state, 'bed');

    expect(bed.focus).toHaveBeenCalledTimes(1);
    expect(lamp.focus).not.toHaveBeenCalled();
    expect(lamp.blur).not.toHaveBeenCalled();
    expect(bed.sync).toHaveBeenCalledWith(state);
    expect(lamp.sync).toHaveBeenCalledWith(state);
  });

  it('null focus blurs focused', () => {
    bed.isFocused = true;
    const build = createSceneBuild(scene, resolveKey, content, spec);

    build.sync(state, null);

    expect(bed.blur).toHaveBeenCalledTimes(1);
    expect(bed.focus).not.toHaveBeenCalled();
    expect(lamp.blur).not.toHaveBeenCalled();
    expect(lamp.focus).not.toHaveBeenCalled();
    expect(bed.sync).toHaveBeenCalledWith(state);
    expect(lamp.sync).toHaveBeenCalledWith(state);
  });
});

describe('createSceneBuild dispose', () => {
  it('dispose destroys objects and effects', () => {
    const effects = [{ destroy: vi.fn() }, { destroy: vi.fn() }];
    vi.mocked(buildEffects).mockReturnValue(effects);
    const destroyedWith: unknown[][] = [];
    vi.mocked(destroyEffects).mockImplementation((handles) => {
      destroyedWith.push([...handles]);
    });
    const build = createSceneBuild(scene, resolveKey, content, spec);

    build.dispose();

    expect(bed.destroy).toHaveBeenCalledTimes(1);
    expect(lamp.destroy).toHaveBeenCalledTimes(1);
    expect(destroyEffects).toHaveBeenCalledTimes(1);
    expect(destroyedWith[0]).toEqual(effects);
    expect(build.objects).toHaveLength(0);
    expect(build.effects).toHaveLength(0);
  });

  it('second dispose does not throw', () => {
    const build = createSceneBuild(scene, resolveKey, content, spec);
    build.dispose();

    expect(() => build.dispose()).not.toThrow();
    expect(bed.destroy).toHaveBeenCalledTimes(1);
    expect(lamp.destroy).toHaveBeenCalledTimes(1);
  });
});
