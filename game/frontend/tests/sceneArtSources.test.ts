import { describe, it, expect } from 'vitest';
import type { AssetEntry } from '@game/assets/manifest';
import { ART_SOURCES } from '../src/art/sources';
import { ROOM_ART_SIZES } from '../src/art/roomSizes';
import { generateAssets } from '../src/lib/generateAssets';
import { gridToRgba } from '../src/lib/gridToRgba';
import { PALETTE } from '../src/lib/palette';
import { readPngSize } from '../src/lib/pngEncode';
import committedManifest from '../../public/assets/worlds/the-boys-room/manifest.json';

const generated = generateAssets(ART_SOURCES);
const committed = committedManifest.assets as AssetEntry[];

describe('scene art sources', () => {
  // Given the art sources, When generateAssets runs, Then every expected asset id is present.
  describe('ids', () => {
    it('includes every room size name under the room/ prefix', () => {
      const ids = generated.entries.map((e) => e.id);
      for (const name of Object.keys(ROOM_ART_SIZES)) {
        expect(ids).toContain(`room/${name}`);
      }
      expect(Object.keys(ROOM_ART_SIZES)).toHaveLength(13);
    });

    it('includes the boy sheet, boy portrait, secret door, dust effect and hand cursor', () => {
      const ids = generated.entries.map((e) => e.id);
      expect(ids).toEqual(
        expect.arrayContaining([
          'character:boy-sheet',
          'character:boy-portrait',
          'objects/secret-door-open',
          'effect:dust',
          'ui/cursor-hand',
        ]),
      );
    });
  });

  // Given the item icon sources, When generated and committed manifests are compared, Then every item icon is present and 16x16.
  describe('item icons', () => {
    it('includes at least six item/ icons in generated and committed manifests', () => {
      const generatedItemIds = generated.entries
        .map((e) => e.id)
        .filter((id) => id.startsWith('item/'));
      const committedItemIds = committed
        .map((e) => e.id)
        .filter((id) => id.startsWith('item/'));
      expect(generatedItemIds.length).toBeGreaterThanOrEqual(6);
      expect(committedItemIds.length).toBeGreaterThanOrEqual(6);
      for (const id of generatedItemIds) {
        expect(committedItemIds, `committed manifest is missing ${id}`).toContain(id);
      }
    });

    it('renders each item icon at 16x16', () => {
      const itemEntries = generated.entries.filter((e) => e.id.startsWith('item/'));
      expect(itemEntries.length).toBeGreaterThan(0);
      for (const entry of itemEntries) {
        const file = generated.files.find((f) => f.path === entry.path);
        expect(file, `missing file for ${entry.id}`).toBeDefined();
        expect(readPngSize(file!.bytes), entry.id).toEqual({ width: 16, height: 16 });
        expect(entry.dimensions, entry.id).toEqual({ width: 16, height: 16 });
        expect(entry.path.endsWith('.png'), entry.id).toBe(true);
      }
    });
  });

  // Given each generated PNG, When its header is read, Then its size equals the declared entry dimensions.
  describe('PNG sizes', () => {
    it('declares dimensions that match each encoded PNG file', () => {
      for (const entry of generated.entries) {
        const file = generated.files.find((f) => f.path === entry.path);
        expect(file, `missing file for ${entry.id}`).toBeDefined();
        expect(readPngSize(file!.bytes), entry.id).toEqual(entry.dimensions);
      }
    });

    it('renders the secret door at 32x64', () => {
      const entry = generated.entries.find((e) => e.id === 'objects/secret-door-open');
      expect(entry?.dimensions).toEqual({ width: 32, height: 64 });
    });

    it('renders the dust mote at 4x4', () => {
      const entry = generated.entries.find((e) => e.id === 'effect:dust');
      expect(entry?.dimensions).toEqual({ width: 4, height: 4 });
    });
  });

  // Given every frame of every source, When converted through the palette, Then each pixel resolves to a palette colour.
  describe('palette', () => {
    it('converts every frame of every source without an out-of-range palette index', () => {
      const allowed = new Set(PALETTE.map((hex) => hex.toLowerCase()));
      for (const source of ART_SOURCES) {
        for (const frame of source.frames) {
          expect(() => gridToRgba(frame, PALETTE), source.id).not.toThrow();
          const img = gridToRgba(frame, PALETTE);
          for (let o = 0; o < img.data.length; o += 4) {
            if (img.data[o + 3] === 0) continue;
            const hex = '#' + [0, 1, 2]
              .map((k) => img.data[o + k].toString(16).padStart(2, '0'))
              .join('');
            expect(allowed.has(hex), `${source.id} colour ${hex}`).toBe(true);
          }
        }
      }
    });
  });

  // Given the committed manifest, When compared to generated entries, Then each entry with the same id is identical.
  describe('committed manifest', () => {
    it('matches each generated entry exactly by id', () => {
      for (const entry of generated.entries) {
        const match = committed.find((c) => c.id === entry.id);
        expect(match, `committed manifest is missing ${entry.id}`).toBeDefined();
        expect(entry).toEqual(match);
      }
    });

    it('references no svg', () => {
      expect(committed.filter((e) => e.path.endsWith('.svg')).map((e) => e.id)).toEqual([]);
    });
  });
});
