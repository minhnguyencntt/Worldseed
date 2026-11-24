import { describe, it, expect } from 'vitest';
import { PALETTE } from '../src/lib/palette';
import { gridToRgba } from '../src/lib/gridToRgba';
import { rampIndex } from '../src/art/draw';
import { ROOM_SOURCES } from '../src/art/roomSources';
import { ROOM_ART_SIZES } from '../src/art/roomSizes';

function sourceById(id: string) {
  const source = ROOM_SOURCES.find((s) => s.id === id);
  if (!source) throw new Error(`missing room source ${id}`);
  return source;
}

function indexSet(id: string): Set<number> {
  return new Set(sourceById(id).frames[0].flat());
}

describe('room sources coverage and sizes', () => {
  it('lists each room source id exactly once', () => {
    const ids = ROOM_SOURCES.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('covers exactly the names in ROOM_ART_SIZES', () => {
    const names = ROOM_SOURCES.map((s) => s.id.replace(/^room\//, '')).sort();
    const sizeNames = Object.keys(ROOM_ART_SIZES).sort();
    expect(names).toEqual(sizeNames);
    expect(names.length).toBe(13);
  });

  it.each(ROOM_SOURCES.map((s) => s.id))(
    'builds %s as a single frame whose grid matches its ROOM_ART_SIZES entry',
    (id) => {
      const key = id.replace(/^room\//, '') as keyof typeof ROOM_ART_SIZES;
      const size = ROOM_ART_SIZES[key];
      const source = sourceById(id);

      expect(source.frames.length).toBe(1);
      const grid = source.frames[0];
      expect(grid.length).toBe(size.height);
      for (const row of grid) {
        expect(row.length).toBe(size.width);
      }
    },
  );
});

describe('room sources palette use', () => {
  it.each(ROOM_SOURCES.map((s) => s.id))(
    'uses only integer palette indices in range and at least three distinct indices in %s',
    (id) => {
      const indices = indexSet(id);
      expect(indices.size).toBeGreaterThanOrEqual(3);
      for (const idx of indices) {
        expect(Number.isInteger(idx)).toBe(true);
        expect(idx).toBeGreaterThanOrEqual(0);
        expect(idx).toBeLessThan(PALETTE.length);
      }
    },
  );

  it.each(ROOM_SOURCES.map((s) => s.id))(
    'converts %s to RGBA with PALETTE without throwing',
    (id) => {
      expect(() => gridToRgba(sourceById(id).frames[0], PALETTE)).not.toThrow();
    },
  );

  it('bookshelf uses plum 3, hoodie 3, lamp 3 and moon 3', () => {
    const indices = indexSet('room/bookshelf');
    expect(indices.has(rampIndex('plum', 3))).toBe(true);
    expect(indices.has(rampIndex('hoodie', 3))).toBe(true);
    expect(indices.has(rampIndex('lamp', 3))).toBe(true);
    expect(indices.has(rampIndex('moon', 3))).toBe(true);
  });

  it('bed uses hoodie 3 and hoodie 2', () => {
    const indices = indexSet('room/bed');
    expect(indices.has(rampIndex('hoodie', 3))).toBe(true);
    expect(indices.has(rampIndex('hoodie', 2))).toBe(true);
  });

  it('door bottom row is lamp 5 across its full width', () => {
    const grid = sourceById('room/door').frames[0];
    const bottom = grid[grid.length - 1];
    expect(bottom.length).toBe(ROOM_ART_SIZES.door.width);
    for (const idx of bottom) {
      expect(idx).toBe(rampIndex('lamp', 5));
    }
  });
});
