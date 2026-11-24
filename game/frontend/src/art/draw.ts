import { PALETTE_RAMPS } from '../lib/palette';

export type Grid = number[][];

export function rampIndex(ramp: keyof typeof PALETTE_RAMPS, step: number): number {
  if (!Number.isInteger(step) || step < 0 || step > 5) throw new Error(`bad ramp step ${step}`);
  return Object.keys(PALETTE_RAMPS).indexOf(ramp) * 6 + step;
}

export function createGrid(w: number, h: number, idx: number): Grid {
  return Array.from({ length: h }, () => Array(w).fill(idx) as number[]);
}

export function fillRect(g: Grid, x: number, y: number, w: number, h: number, idx: number): void {
  for (let cy = y; cy < y + h; cy++) {
    if (cy < 0 || cy >= g.length) continue;
    for (let cx = x; cx < x + w; cx++) {
      if (cx < 0 || cx >= g[cy].length) continue;
      g[cy][cx] = idx;
    }
  }
}

export function outlineRect(g: Grid, x: number, y: number, w: number, h: number, idx: number): void {
  if (w <= 0 || h <= 0) return;
  fillRect(g, x, y, w, 1, idx);
  fillRect(g, x, y + h - 1, w, 1, idx);
  fillRect(g, x, y, 1, h, idx);
  fillRect(g, x + w - 1, y, 1, h, idx);
}

export function shadeRect(
  g: Grid,
  x: number,
  y: number,
  w: number,
  h: number,
  ramp: keyof typeof PALETTE_RAMPS,
  lightStep: number,
  darkStep: number,
): void {
  const light = rampIndex(ramp, lightStep);
  const dark = rampIndex(ramp, darkStep);
  for (let row = 0; row < h; row++) {
    const t = h === 1 ? 0 : row / (h - 1);
    const idx = Math.round(light + (dark - light) * t);
    fillRect(g, x, y + row, w, 1, idx);
  }
}

export function dither(g: Grid, x: number, y: number, w: number, h: number, a: number, b: number): void {
  for (let cy = y; cy < y + h; cy++) {
    if (cy < 0 || cy >= g.length) continue;
    for (let cx = x; cx < x + w; cx++) {
      if (cx < 0 || cx >= g[cy].length) continue;
      g[cy][cx] = (cx + cy) % 2 === 0 ? a : b;
    }
  }
}
