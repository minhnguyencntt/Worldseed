import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createPreloader } from '../src/phaser/preload';
import type { AssetManifest } from '@game/assets/manifest';
import type { SceneDef } from '@game/state/types';

// Phaser is a browser canvas runtime; createPreloader only needs make.graphics, load and textures.
vi.mock('phaser', () => ({ default: {} }));

const manifest = {
  version: 1,
  assets: [
    { id: 'objects/bed', path: 'a/bed.png', type: 'image' },
    {
      id: 'characters/boy',
      path: 'b/boy.png',
      type: 'spritesheet',
      dimensions: { width: 64, height: 48 },
      frames: { frameWidth: 32, frameHeight: 48, frameCount: 2 },
    },
  ],
} as unknown as AssetManifest;

// The scene references the bed, the boy's idle animation and one asset the manifest does not know.
const sceneDef = {
  id: 'bedroom',
  title: 'Bedroom',
  objects: [
    { id: 'bed', asset: 'objects/bed' },
    { id: 'ghost', asset: 'objects/ghost' },
  ],
  characters: [{ id: 'boy', animations: { idle: { asset: 'characters/boy' } } }],
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

describe('createPreloader queueing', () => {
  let scene: {
    load: { image: ReturnType<typeof vi.fn>; spritesheet: ReturnType<typeof vi.fn>; on: ReturnType<typeof vi.fn>; off: ReturnType<typeof vi.fn> };
    make: { graphics: ReturnType<typeof vi.fn> };
    textures: { exists: ReturnType<typeof vi.fn>; remove: ReturnType<typeof vi.fn> };
  };

  beforeEach(() => {
    scene = {
      load: { image: vi.fn(), spritesheet: vi.fn(), on: vi.fn(), off: vi.fn() },
      make: { graphics: vi.fn(() => makeGraphics()) },
      textures: { exists: vi.fn(() => false), remove: vi.fn() },
    };
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('queues the referenced image with its manifest path under the assets prefix', () => {
    createPreloader(scene as never, sceneDef, manifest);

    expect(scene.load.image).toHaveBeenCalledWith('objects/bed', 'assets/a/bed.png');
  });

  it('queues the referenced spritesheet with the frame size from its manifest entry', () => {
    createPreloader(scene as never, sceneDef, manifest);

    expect(scene.load.spritesheet).toHaveBeenCalledWith(
      'characters/boy',
      'assets/b/boy.png',
      expect.objectContaining({ frameWidth: 32, frameHeight: 48 }),
    );
  });

  it('warns about an unknown asset reference and never queues it', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    createPreloader(scene as never, sceneDef, manifest);

    expect(warn).toHaveBeenCalledWith('unknown asset ref: objects/ghost');
    expect(scene.load.image).not.toHaveBeenCalledWith('objects/ghost', expect.anything());
    expect(scene.load.spritesheet).not.toHaveBeenCalledWith('objects/ghost', expect.anything(), expect.anything());
  });
});
