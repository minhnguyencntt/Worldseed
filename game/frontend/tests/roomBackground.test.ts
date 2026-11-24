import { describe, it, expect } from 'vitest';
import { PALETTE } from '../src/lib/palette';
import { gridToRgba } from '../src/lib/gridToRgba';
import { rampIndex } from '../src/art/draw';
import { BACKGROUND_SOURCES } from '../src/art/roomBackground';
import { ROOM_ART_SIZES } from '../src/art/roomSizes';

const PALETTE_RGB = new Set(
  PALETTE.map((hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)).join(',')),
);

function sourceGrid(id: string) {
  const source = BACKGROUND_SOURCES.find((s) => s.id === id);
  if (!source) throw new Error(`missing background source ${id}`);
  return source.frames[0];
}

describe('room background grid sizes', () => {
  it.each(BACKGROUND_SOURCES.map((s) => s.id))(
    'builds %s as a single frame whose grid matches its ROOM_ART_SIZES entry',
    (id) => {
      const key = id.replace(/^room\//, '') as keyof typeof ROOM_ART_SIZES;
      const size = ROOM_ART_SIZES[key];
      const source = BACKGROUND_SOURCES.find((s) => s.id === id)!;

      expect(source.frames.length).toBe(1);
      const grid = source.frames[0];
      expect(grid.length).toBe(size.height);
      for (const row of grid) {
        expect(row.length).toBe(size.width);
      }
    },
  );
});

describe('room background palette use', () => {
  it.each(BACKGROUND_SOURCES.map((s) => s.id))(
    'uses only PALETTE colours and at least three distinct indices in %s',
    (id) => {
      const image = gridToRgba(sourceGrid(id), PALETTE);
      const colours = new Set<string>();
      const indices = new Set<number>();
      for (let o = 0; o < image.data.length; o += 4) {
        colours.add(`${image.data[o]},${image.data[o + 1]},${image.data[o + 2]}`);
      }
      for (const row of sourceGrid(id)) {
        for (const idx of row) indices.add(idx);
      }

      for (const rgb of colours) {
        expect(PALETTE_RGB.has(rgb)).toBe(true);
      }
      expect(indices.size).toBeGreaterThanOrEqual(3);
    },
  );

  it('wall grid contains both plum step 2 and plum step 3', () => {
    const indices = new Set(sourceGrid('room/wall').flat());
    expect(indices.has(rampIndex('plum', 2))).toBe(true);
    expect(indices.has(rampIndex('plum', 3))).toBe(true);
  });

  it('wainscot grid contains a wood ramp index', () => {
    const woodIndices = new Set([0, 1, 2, 3, 4, 5].map((step) => rampIndex('wood', step)));
    const indices = sourceGrid('room/wainscot').flat();
    expect(indices.some((idx) => woodIndices.has(idx))).toBe(true);
  });

  it('window grid contains moon step 5 and a brass ramp index', () => {
    const indices = new Set(sourceGrid('room/window').flat());
    const brassIndices = [0, 1, 2, 3, 4, 5].map((step) => rampIndex('brass', step));
    expect(indices.has(rampIndex('moon', 5))).toBe(true);
    expect(brassIndices.some((idx) => indices.has(idx))).toBe(true);
  });
});
