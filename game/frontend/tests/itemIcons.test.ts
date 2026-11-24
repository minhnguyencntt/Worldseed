import { describe, it, expect } from 'vitest';
import { ITEM_SOURCES } from '../src/art/itemIcons';
import { ART_SOURCES } from '../src/art/sources';
import { rampIndex } from '../src/art/draw';
import { gridToRgba } from '../src/lib/gridToRgba';
import { PALETTE } from '../src/lib/palette';

const ITEM_SIZE = 16;
const OUTLINE = rampIndex('indigo', 0);

function sourceById(id: string) {
  const source = ITEM_SOURCES.find((s) => s.id === id);
  if (!source) throw new Error(`missing item source ${id}`);
  return source;
}

describe('item icon sources', () => {
  it('has six unique item/ ids', () => {
    const ids = ITEM_SOURCES.map((s) => s.id);
    expect(ids).toEqual([
      'item/old-key',
      'item/note',
      'item/book',
      'item/coin',
      'item/flashlight',
      'item/photo',
    ]);
    expect(new Set(ids).size).toBe(6);
  });

  it.each(ITEM_SOURCES.map((s) => s.id))(
    'draws %s as one 16x16 frame with an outline and at least three shades',
    (id) => {
      const source = sourceById(id);
      expect(source.frames.length).toBe(1);

      const grid = source.frames[0];
      expect(grid.length).toBe(ITEM_SIZE);
      for (const row of grid) {
        expect(row.length).toBe(ITEM_SIZE);
      }

      const flat = grid.flat();
      expect(flat).toContain(OUTLINE);

      const distinct = new Set(flat);
      expect(distinct.size).toBeGreaterThanOrEqual(3);
      const nonOutline = [...distinct].filter((idx) => idx !== OUTLINE);
      expect(distinct.has(0) || nonOutline.length >= 2).toBe(true);
    },
  );

  it.each(ITEM_SOURCES.map((s) => s.id))(
    'uses only integer palette indices inside PALETTE for %s',
    (id) => {
      for (const idx of sourceById(id).frames[0].flat()) {
        expect(Number.isInteger(idx)).toBe(true);
        expect(idx).toBeGreaterThanOrEqual(0);
        expect(idx).toBeLessThan(PALETTE.length);
      }
    },
  );

  it.each(ITEM_SOURCES.map((s) => s.id))(
    'converts %s to RGBA with PALETTE without throwing',
    (id) => {
      expect(() => gridToRgba(sourceById(id).frames[0], PALETTE)).not.toThrow();
    },
  );

  it.each(ITEM_SOURCES.map((s) => s.id))(
    'is included in ART_SOURCES as %s',
    (id) => {
      expect(ART_SOURCES.map((s) => s.id)).toContain(id);
    },
  );

  it('is included in ART_SOURCES', () => {
    const artIds = ART_SOURCES.map((s) => s.id);
    for (const source of ITEM_SOURCES) {
      expect(artIds).toContain(source.id);
    }
  });
});
