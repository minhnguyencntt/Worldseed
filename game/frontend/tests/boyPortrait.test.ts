import { describe, it, expect } from 'vitest';
import { BOY_PORTRAIT_SOURCE } from '../src/art/boy';
import { PALETTE } from '../src/lib/palette';

describe('boy portrait', () => {
  it('has one frame', () => {
    expect(BOY_PORTRAIT_SOURCE.frames.length).toBe(1);
  });

  it('is 32x32', () => {
    const frame = BOY_PORTRAIT_SOURCE.frames[0];
    expect(frame.length).toBe(32);
    for (const row of frame) {
      expect(row.length).toBe(32);
    }
  });

  it('uses only palette indices', () => {
    const frame = BOY_PORTRAIT_SOURCE.frames[0];
    for (const row of frame) {
      for (const cell of row) {
        expect(Number.isInteger(cell)).toBe(true);
        expect(cell).toBeGreaterThanOrEqual(0);
        expect(cell).toBeLessThanOrEqual(PALETTE.length - 1);
      }
    }
  });
});
