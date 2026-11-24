import { describe, it, expect } from 'vitest';
import { parseManifest } from '@game/assets/manifest';
import { ART_SOURCES, type ArtSource } from '../src/art/sources';
import { BOY_SOURCES } from '../src/art/boy';
import { generateAssets } from '../src/lib/generateAssets';

describe('generateAssets schema validation', () => {
  // Every shipped source must produce entries that the manifest schema accepts as a whole file.
  describe('when the shipped art sources are generated', () => {
    it('every ART_SOURCES entry passes parseManifest', () => {
      const { entries } = generateAssets(ART_SOURCES);

      const result = parseManifest({ version: 1, assets: entries });

      expect(result.ok).toBe(true);
    });
  });

  // A malformed source must be rejected with an error that names the offending entry.
  describe('when a source has an empty id', () => {
    it('rejects an invalid entry with a path-tagged message', () => {
      const source: ArtSource = {
        id: '',
        path: 'a.png',
        frames: [[[0]]],
      };

      expect(() => generateAssets([source])).toThrow(/invalid manifest entry/);
    });
  });

  // The boy sheet metadata must match the animation layout the game reads at runtime.
  describe('when the boy sheet is generated', () => {
    it('boy sheet metadata', () => {
      const { entries } = generateAssets(BOY_SOURCES);
      const entry = entries.find((e) => e.id === 'character:boy-sheet');

      expect(entry).toBeDefined();
      expect(entry?.dimensions).toEqual({ width: 448, height: 48 });
      expect(entry?.frames).toEqual({ frameWidth: 32, frameHeight: 48, frameCount: 14 });
      expect(entry?.animations?.idle.frames).toEqual([0, 1, 2, 3]);
      expect(entry?.animations?.walk.frames).toEqual([4, 5, 6, 7, 8, 9]);
      expect(entry?.animations?.interact.frames).toEqual([10, 11, 12, 13]);
    });
  });
});
