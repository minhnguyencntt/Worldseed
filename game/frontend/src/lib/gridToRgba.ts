import { PALETTE } from './palette';

export interface RgbaImage { width: number; height: number; data: Uint8ClampedArray; }

export function gridToRgba(grid: readonly (readonly number[])[], palette: readonly string[] = PALETTE): RgbaImage {
  const height = grid.length;
  const width = grid[0]?.length ?? 0;
  if (height === 0 || width === 0) throw new Error('grid must not be empty');
  const data = new Uint8ClampedArray(width * height * 4);
  grid.forEach((row, y) => {
    if (row.length !== width) throw new Error(`row ${y} has width ${row.length}, expected ${width}`);
    row.forEach((idx, x) => {
      if (!Number.isInteger(idx) || idx < 0 || idx >= palette.length) throw new Error(`palette index out of range: ${idx} at (${x},${y})`);
      const hex = palette[idx];
      const o = (y * width + x) * 4;
      data[o] = parseInt(hex.slice(1, 3), 16);
      data[o + 1] = parseInt(hex.slice(3, 5), 16);
      data[o + 2] = parseInt(hex.slice(5, 7), 16);
      data[o + 3] = 255;
    });
  });
  return { width, height, data };
}
