import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createPreloader, FALLBACK_KEY } from '../src/phaser/preload';
import type { AssetManifest } from '@game/assets/manifest';
import type { SceneDef } from '@game/state/types';

// Phaser is a browser canvas runtime; createPreloader only needs make.graphics, load and textures.
vi.mock('phaser', () => ({ default: {} }));

const manifest = {
  version: 1,
  assets: [{ id: 'objects/bed', path: 'a/bed.png', type: 'image' }],
} as unknown as AssetManifest;

const sceneDef = {
  id: 'bedroom',
  title: 'Bedroom',
  objects: [{ id: 'bed', asset: 'objects/bed' }],
  characters: [],
  dialogue: [],
} as unknown as SceneDef;

const makeGraphics = () => {
  const g: Record<string, unknown> = {};
  g.fillStyle = vi.fn(() => g);
  g.fillRect = vi.fn(() => g);
  g.generateTexture = vi.fn();
  g.destroy = vi.fn();
  return g;
};

describe('createPreloader fallback and dispose', () => {
  let graphics: ReturnType<typeof makeGraphics>;
  let scene: {
    load: { image: ReturnType<typeof vi.fn>; spritesheet: ReturnType<typeof vi.fn>; on: ReturnType<typeof vi.fn>; off: ReturnType<typeof vi.fn> };
    make: { graphics: ReturnType<typeof vi.fn> };
    textures: { exists: ReturnType<typeof vi.fn>; remove: ReturnType<typeof vi.fn> };
  };

  beforeEach(() => {
    graphics = makeGraphics();
    scene = {
      load: { image: vi.fn(), spritesheet: vi.fn(), on: vi.fn(), off: vi.fn() },
      make: { graphics: vi.fn(() => graphics) },
      textures: { exists: vi.fn(() => false), remove: vi.fn() },
    };
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // The loaderror handler is the one createPreloader registered on the scene's loader.
  const loadErrorHandler = (): ((file: { key: string }) => void) => {
    const call = scene.load.on.mock.calls.find(([event]) => event === 'loaderror');
    if (!call) throw new Error('loaderror listener was not registered');
    return call[1] as (file: { key: string }) => void;
  };

  it('resolves an unknown asset id to the fallback key', () => {
    const preloader = createPreloader(scene as never, sceneDef, manifest);

    expect(preloader.resolveKey('nope')).toBe(FALLBACK_KEY);
  });

  it('resolves a known asset id to its own key before any load error', () => {
    const preloader = createPreloader(scene as never, sceneDef, manifest);

    expect(preloader.resolveKey('objects/bed')).toBe('objects/bed');
  });

  it('resolves an asset to the fallback key once its load has failed', () => {
    const preloader = createPreloader(scene as never, sceneDef, manifest);

    loadErrorHandler()({ key: 'objects/bed' });

    expect(preloader.resolveKey('objects/bed')).toBe(FALLBACK_KEY);
  });

  it('generates the 8x8 fallback texture under the fallback key', () => {
    createPreloader(scene as never, sceneDef, manifest);

    expect(graphics.generateTexture).toHaveBeenCalledWith(FALLBACK_KEY, 8, 8);
  });

  it('dispose removes the loaderror listener and an existing fallback texture', () => {
    const preloader = createPreloader(scene as never, sceneDef, manifest);
    const handler = loadErrorHandler();
    scene.textures.exists.mockReturnValue(true);

    preloader.dispose();

    expect(scene.load.off).toHaveBeenCalledWith('loaderror', handler);
    expect(scene.textures.remove).toHaveBeenCalledWith(FALLBACK_KEY);
  });
});
