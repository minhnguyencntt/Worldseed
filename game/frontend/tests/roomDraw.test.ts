import { describe, it, expect } from 'vitest';
import { PALETTE, PALETTE_RAMPS } from '../src/lib/palette';
import { rampIndex, createGrid, fillRect, outlineRect, shadeRect, dither } from '../src/art/draw';
import { ROOM_ART_SIZES } from '../src/art/roomSizes';

describe('draw helpers', () => {
  it('maps a ramp step to the matching palette index', () => {
    expect(rampIndex('wood', 2)).toBe(PALETTE.indexOf(PALETTE_RAMPS.wood[2]));
  });

  it('rejects ramp steps outside 0..5', () => {
    expect(() => rampIndex('indigo', 6)).toThrow();
  });

  it('creates a grid of h rows, each w cells filled with the given index', () => {
    expect(createGrid(4, 3, 7)).toEqual([
      [7, 7, 7, 7],
      [7, 7, 7, 7],
      [7, 7, 7, 7],
    ]);
  });

  it('fills a rectangle clipped to the grid bounds', () => {
    const g = createGrid(3, 3, 0);
    fillRect(g, 1, 1, 5, 5, 9);
    const filled: Array<[number, number]> = [];
    g.forEach((row, y) => row.forEach((v, x) => { if (v === 9) filled.push([x, y]); }));
    expect(filled).toEqual([[1, 1], [2, 1], [1, 2], [2, 2]]);
  });

  it('outlines a rectangle and leaves the interior untouched', () => {
    const g = createGrid(4, 4, 0);
    outlineRect(g, 0, 0, 4, 4, 5);
    expect(g[1][1]).toBe(0);
    expect(g[1][2]).toBe(0);
    expect(g[2][1]).toBe(0);
    expect(g[2][2]).toBe(0);
    expect(g[0]).toEqual([5, 5, 5, 5]);
    expect(g[3]).toEqual([5, 5, 5, 5]);
    expect(g.map((row) => row[0])).toEqual([5, 5, 5, 5]);
    expect(g.map((row) => row[3])).toEqual([5, 5, 5, 5]);
  });

  it('shades a column from light to dark step in descending indices', () => {
    const g = createGrid(1, 4, 0);
    shadeRect(g, 0, 0, 1, 4, 'wood', 4, 1);
    expect(g.map((row) => row[0])).toEqual([
      rampIndex('wood', 4),
      rampIndex('wood', 3),
      rampIndex('wood', 2),
      rampIndex('wood', 1),
    ]);
  });

  it('checkerboards two indices across a rectangle', () => {
    const g = createGrid(2, 2, 0);
    dither(g, 0, 0, 2, 2, 1, 2);
    expect(g).toEqual([
      [1, 2],
      [2, 1],
    ]);
  });
});

describe('ROOM_ART_SIZES', () => {
  const EXPECTED_IDS = [
    'wall', 'wainscot', 'floor', 'window', 'desk', 'computer', 'lamp',
    'plant', 'poster', 'bookshelf', 'bed', 'door', 'rug',
  ].sort();

  it('registers exactly the 13 expected room art ids', () => {
    expect(Object.keys(ROOM_ART_SIZES).sort()).toEqual(EXPECTED_IDS);
  });

  it('gives every entry a positive integer width and height', () => {
    for (const [id, size] of Object.entries(ROOM_ART_SIZES)) {
      expect(Number.isInteger(size.width), `${id}.width`).toBe(true);
      expect(size.width, `${id}.width`).toBeGreaterThan(0);
      expect(Number.isInteger(size.height), `${id}.height`).toBe(true);
      expect(size.height, `${id}.height`).toBeGreaterThan(0);
    }
  });

  it('stacks wall, wainscot and floor to 270 px at 480 px wide', () => {
    const { wall, wainscot, floor } = ROOM_ART_SIZES;
    expect(wall.height + wainscot.height + floor.height).toBe(270);
    expect(wall.width).toBe(480);
    expect(wainscot.width).toBe(480);
    expect(floor.width).toBe(480);
  });
});
