import { beforeEach, describe, it, expect, vi } from 'vitest';
import { planPreload, resolveTextureKey } from '../src/engine/planPreload';
import type { AssetManifest } from '../src/assets/manifest';
import type { SceneDef } from '../src/state/types';
import { validScene } from './fixtures/valid-world';
import { BootScene, FALLBACK_KEY } from '../frontend/src/phaser/BootScene';

// Phaser is a browser canvas runtime; preload only needs Scene.events, make.graphics and load.
// phaser is installed under frontend/ only, so mock that resolved path (a bare 'phaser' does not resolve from game/tests).
vi.mock('../frontend/node_modules/phaser', () => ({
  default: {
    Scene: class {
      events = { once: vi.fn() };
    },
    Scenes: { Events: { SHUTDOWN: 'shutdown' } },
  },
}));

// Content is mocked so the test controls exactly which assets the scene references
// and which assets the manifest declares.
vi.mock('../frontend/src/runtime/content', () => ({
  scene: {
    id: 'bedroom',
    title: 'Bedroom',
    objects: [
      { id: 'bed', asset: 'objects/bed' },
      { id: 'ghost', asset: 'objects/ghost' },
    ],
    dialogue: [],
  },
  manifest: {
    version: 1,
    assets: [
      { id: 'objects/bed', path: 'worlds/the-boys-room/furniture/bed.svg', type: 'image' },
      { id: 'objects/desk', path: 'worlds/the-boys-room/furniture/desk.svg', type: 'image' },
    ],
  },
}));

// Shared store, event bus and effect context are stubbed: BootScene.preload touches none of them.
vi.mock('../frontend/src/store/gameStore', () => ({
  useGameStore: {
    getState: () => ({ state: null }),
    subscribe: vi.fn(() => () => {}),
  },
}));

vi.mock('../frontend/src/phaser/events', () => ({
  phaserToReact: { emit: vi.fn() },
}));

vi.mock('../frontend/src/phaser/effectContext', () => ({
  createPhaserEffectContext: vi.fn(() => ({})),
}));

// In-memory manifest only: no filesystem, loader or real asset tree.
const manifest: AssetManifest = {
  version: 1,
  assets: [{ id: 'A', path: 'a.svg', type: 'image', dimensions: { width: 10, height: 10 } }],
};

const baseObject = validScene.objects[0];

describe('planPreload', () => {
  it('dedupes: an asset referenced by two objects is planned for load once', () => {
    // Given a scene with two objects that both use asset 'A', which is in the manifest
    const scene: SceneDef = {
      ...validScene,
      objects: [
        { ...baseObject, id: 'one', asset: 'A' },
        { ...baseObject, id: 'two', asset: 'A' },
      ],
    };
    // When planning the preload
    const plan = planPreload(scene, manifest);
    // Then 'A' is loaded exactly once and nothing is unknown
    expect(plan.load).toEqual(['A']);
    expect(plan.unknown).toEqual([]);
  });

  it('reports unknown: assets missing from the manifest are reported, not loaded', () => {
    // Given one object using asset 'Z' and one dust effect using asset 'Y', neither in the manifest
    const scene: SceneDef = {
      ...validScene,
      objects: [{ ...baseObject, id: 'obj', asset: 'Z' }],
      effects: [{ type: 'dust', asset: 'Y', count: 3, area: { x: 0, y: 0, width: 10, height: 10 } }],
    };
    // When planning the preload
    const plan = planPreload(scene, manifest);
    // Then both assets are unknown, in reference order, and none are loaded
    expect(plan.unknown).toEqual(['Z', 'Y']);
    expect(plan.load).toEqual([]);
  });
});

describe('resolveTextureKey', () => {
  it('returns the id itself when the manifest contains it', () => {
    // Given a manifest containing asset 'A'
    // When resolving id 'A' with a fallback
    // Then the id itself is returned
    expect(resolveTextureKey('A', manifest, 'fallback:missing')).toBe('A');
  });

  it('returns the fallback when the id is not in the manifest', () => {
    // Given a manifest that does not contain 'nope'
    // When resolving id 'nope' with a fallback
    // Then the fallback id is returned
    expect(resolveTextureKey('nope', manifest, 'fallback:missing')).toBe('fallback:missing');
  });

  it('returns the fallback when the id is undefined', () => {
    // Given no texture id
    // When resolving undefined with a fallback
    // Then the fallback id is returned
    expect(resolveTextureKey(undefined, manifest, 'fallback:missing')).toBe('fallback:missing');
  });
});

const makeGraphics = () => {
  const g: Record<string, unknown> = {};
  g.fillStyle = vi.fn(() => g);
  g.fillRect = vi.fn(() => g);
  g.generateTexture = vi.fn();
  g.destroy = vi.fn();
  return g;
};

describe('BootScene', () => {
  let boot: BootScene;
  let image: ReturnType<typeof vi.fn>;
  let on: ReturnType<typeof vi.fn>;
  let warn: ReturnType<typeof vi.spyOn>;
  let graphics: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    boot = new BootScene();
    image = vi.fn();
    on = vi.fn();
    graphics = vi.fn(() => makeGraphics());
    // preload() also registers a loaderror listener and generates a fallback texture,
    // so the stubs need those members as well as load.image.
    boot.load = { image, on } as unknown as BootScene['load'];
    boot.make = { graphics } as unknown as BootScene['make'];
    warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  describe('preload', () => {
    it('loads the referenced, manifest-known asset once with its manifest path', () => {
      // Given a scene referencing objects/bed (in the manifest) and objects/ghost (not in it)
      // When preload runs
      boot.preload();
      // Then objects/bed is loaded exactly once from its manifest path
      expect(image).toHaveBeenCalledTimes(1);
      expect(image).toHaveBeenCalledWith('objects/bed', 'assets/worlds/the-boys-room/furniture/bed.svg');
    });

    it('never loads a manifest asset that the scene does not reference', () => {
      // Given objects/desk is in the manifest but not referenced by the scene
      // When preload runs
      boot.preload();
      // Then objects/desk is not loaded
      expect(image).not.toHaveBeenCalledWith('objects/desk', expect.anything());
    });

    it('never loads a referenced asset that is missing from the manifest', () => {
      // Given objects/ghost is referenced by the scene but missing from the manifest
      // When preload runs
      boot.preload();
      // Then objects/ghost is not loaded
      expect(image).not.toHaveBeenCalledWith('objects/ghost', expect.anything());
    });

    it('warns about the unknown asset reference by id', () => {
      // Given objects/ghost is referenced by the scene but missing from the manifest
      // When preload runs
      boot.preload();
      // Then a warning names objects/ghost
      expect(warn).toHaveBeenCalledWith('unknown asset ref: objects/ghost');
    });

    it('generates the fallback texture under FALLBACK_KEY', () => {
      // Given a Phaser graphics object available from make.graphics
      // When preload runs
      boot.preload();
      // Then an 8x8 fallback texture is generated under FALLBACK_KEY
      const g = graphics.mock.results[0].value as Record<string, ReturnType<typeof vi.fn>>;
      expect(g.generateTexture).toHaveBeenCalledWith(FALLBACK_KEY, 8, 8);
    });
  });

  describe('resolveKey', () => {
    it('returns FALLBACK_KEY for an id that is not in the manifest', () => {
      // Given a scene whose preload has run
      boot.preload();
      // When resolving id 'nope'
      // Then the fallback key is returned
      expect(boot.resolveKey('nope')).toBe(FALLBACK_KEY);
    });

    it('returns the id itself for a manifest asset that has not failed', () => {
      // Given preload has run and no loaderror has been reported
      boot.preload();
      // When resolving objects/bed
      // Then its own id is returned
      expect(boot.resolveKey('objects/bed')).toBe('objects/bed');
    });

    it('returns FALLBACK_KEY for an asset whose load reported loaderror', () => {
      // Given preload registered a loaderror listener and objects/bed then fails to load
      boot.preload();
      const onLoadError = on.mock.calls.find(([event]) => event === 'loaderror')?.[1] as (file: { key: string }) => void;
      onLoadError({ key: 'objects/bed' });
      // When resolving objects/bed
      // Then the fallback key is returned
      expect(boot.resolveKey('objects/bed')).toBe(FALLBACK_KEY);
    });
  });
});
