import { describe, it, expect } from 'vitest';
import { assetSchema, type AssetEntry } from '@game/assets/manifest';
import { ART_SOURCES, type ArtSource } from '../src/art/sources';
import { generateAssets, mergeManifest } from '../src/lib/generateAssets';
import { readPngSize } from '../src/lib/pngEncode';

const solidGrid = (width: number, height: number, idx: number): number[][] =>
  Array.from({ length: height }, () => Array.from({ length: width }, () => idx));

describe('generateAssets', () => {
  // Given four 32x48 frames of palette index 1, the generator packs them into one PNG strip.
  describe('when a source has several frames', () => {
    it('describes a spritesheet entry whose PNG header matches the packed strip', () => {
      const source: ArtSource = {
        id: 'test/strip',
        path: 'test/strip.png',
        frames: Array.from({ length: 4 }, () => solidGrid(32, 48, 1)),
      };

      const { files, entries } = generateAssets([source]);
      const entry = entries[0];

      expect(entry.dimensions).toEqual({ width: 128, height: 48 });
      expect(entry.frames).toEqual({ frameWidth: 32, frameHeight: 48, frameCount: 4 });
      expect(entry.type).toBe('spritesheet');
      expect(assetSchema.safeParse(entry).success).toBe(true);
      expect(readPngSize(files[0].bytes)).toEqual({ width: 128, height: 48 });
    });
  });

  // A single frame needs no sheet metadata, so the entry is a plain image.
  describe('when a source has a single frame', () => {
    it('describes an image entry without frame metadata', () => {
      const source: ArtSource = {
        id: 'test/single',
        path: 'test/single.png',
        frames: [solidGrid(16, 16, 1)],
      };

      const { entries } = generateAssets([source]);

      expect(entries[0].type).toBe('image');
      expect(entries[0].frames).toBeUndefined();
      expect(entries[0].dimensions).toEqual({ width: 16, height: 16 });
    });
  });

  // A palette index outside the palette must fail loudly instead of producing a corrupt PNG.
  describe('when a grid contains a palette index out of range', () => {
    it('throws an out-of-range error', () => {
      const source: ArtSource = {
        id: 'test/bad',
        path: 'test/bad.png',
        frames: [[[0, 999]]],
      };

      expect(() => generateAssets([source])).toThrow(/out of range/);
    });
  });

  // Duplicate ids would make the manifest ambiguous, so the shipped sources must be unique.
  describe('when the shipped art sources are inspected', () => {
    it('has unique ids across ART_SOURCES', () => {
      const ids = ART_SOURCES.map((source) => source.id);
      expect(new Set(ids).size).toBe(ids.length);
    });
  });
});

describe('mergeManifest', () => {
  const asset = (id: string, width = 8): AssetEntry => ({
    id,
    path: `${id}.png`,
    type: 'image',
    dimensions: { width, height: 8 },
  });

  // Replacing an existing id keeps its position and leaves the neighbours untouched.
  describe('when an incoming entry matches an existing id', () => {
    it('replaces that entry in place and keeps the other entries deep-equal', () => {
      const a = asset('a');
      const b = asset('b');
      const c = asset('c');
      const bChanged = asset('b', 32);
      const manifest = { version: 1, assets: [a, b, c] };

      const result = mergeManifest(manifest, [bChanged]);

      expect(result.assets.map((x) => x.id)).toEqual(['a', 'b', 'c']);
      expect(result.assets[1]).toEqual(bChanged);
      expect(result.assets[0]).toEqual(a);
      expect(result.assets[2]).toEqual(c);
      expect(result.version).toBe(1);
    });
  });

  // Entries that do not match an existing id are new assets and go to the end.
  describe('when an incoming entry has an unknown id', () => {
    it('appends that entry after the existing assets', () => {
      const a = asset('a');
      const b = asset('b');
      const fresh = asset('z');
      const manifest = { version: 1, assets: [a, b] };

      const result = mergeManifest(manifest, [fresh]);

      expect(result.assets.map((x) => x.id)).toEqual(['a', 'b', 'z']);
      expect(result.assets[2]).toEqual(fresh);
    });
  });
});
