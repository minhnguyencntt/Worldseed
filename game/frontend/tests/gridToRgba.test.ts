import { describe, it, expect } from 'vitest';
import { gridToRgba } from '../src/lib/gridToRgba';
import { PALETTE } from '../src/lib/palette';

const toHex = (r: number, g: number, b: number): string =>
  '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('');

describe('gridToRgba', () => {
  describe('dimensions and palette', () => {
    it('returns width, height and RGBA data sized to the grid', () => {
      // Given a 3x2 grid, When converted, Then width=3, height=2 and data holds 4 bytes per pixel.
      const img = gridToRgba([[0, 1, 2], [3, 4, 5]]);
      expect(img.width).toBe(3);
      expect(img.height).toBe(2);
      expect(img.data.length).toBe(24);
    });

    it('only emits palette colours with full alpha for every palette index', () => {
      // Given a grid using every palette index 0..47, When converted,
      // Then each pixel maps back to a palette hex colour with alpha 255.
      const allIndices = PALETTE.map((_, i) => i);
      const img = gridToRgba([allIndices]);
      const paletteSet = new Set(PALETTE.map((hex) => hex.toLowerCase()));

      for (let x = 0; x < img.width; x++) {
        const o = x * 4;
        const hex = toHex(img.data[o], img.data[o + 1], img.data[o + 2]);
        expect(paletteSet.has(hex)).toBe(true);
        expect(img.data[o + 3]).toBe(255);
      }
    });
  });

  describe('errors and determinism', () => {
    it('throws when a palette index equals the palette length', () => {
      // Given an index one past the end of the palette, When converted, Then it throws.
      expect(() => gridToRgba([[PALETTE.length]])).toThrow();
    });

    it('throws when a palette index is negative', () => {
      // Given a negative index, When converted, Then it throws.
      expect(() => gridToRgba([[-1]])).toThrow();
    });

    it('throws when a palette index is not an integer', () => {
      // Given a fractional index, When converted, Then it throws.
      expect(() => gridToRgba([[1.5]])).toThrow();
    });

    it('throws when rows have different lengths', () => {
      // Given a ragged grid [[0,1],[0]], When converted, Then it throws.
      expect(() => gridToRgba([[0, 1], [0]])).toThrow();
    });

    it('throws when the grid is empty', () => {
      // Given an empty grid, When converted, Then it throws.
      expect(() => gridToRgba([])).toThrow();
    });

    it('produces identical pixel data when converting the same grid twice', () => {
      // Given the same grid, When converted twice, Then both results hold equal pixel data.
      const grid = [[0, 7, 13], [21, 34, 47]];
      const a = gridToRgba(grid);
      const b = gridToRgba(grid);
      expect(Array.from(a.data)).toEqual(Array.from(b.data));
    });
  });
});
