import { describe, it, expect } from 'vitest';
import { BOY_SHEET_SOURCE } from '../src/art/boy';
import { PALETTE } from '../src/lib/palette';

// Boy sheet spec (REQ1): 14 frames, each 48 rows by 32 columns, using only PALETTE indices.
const FRAME_COUNT = 14;
const FRAME_ROWS = 48;
const FRAME_COLUMNS = 32;

describe('new: boy sheet frames', () => {
  const frames = BOY_SHEET_SOURCE.frames;

  it('has 14 frames', () => {
    expect(frames.length).toBe(FRAME_COUNT);
  });

  it('each frame is 48 rows by 32 columns', () => {
    frames.forEach((frame, i) => {
      expect(frame.length, `frame ${i} row count`).toBe(FRAME_ROWS);
      frame.forEach((row, y) => {
        expect(row.length, `frame ${i} row ${y} column count`).toBe(FRAME_COLUMNS);
      });
    });
  });

  it('uses only palette indices', () => {
    const values = frames.flat(2);
    expect(values.length).toBe(FRAME_COUNT * FRAME_ROWS * FRAME_COLUMNS);
    for (const v of values) {
      expect(Number.isInteger(v) && v >= 0 && v < PALETTE.length).toBe(true);
    }
  });

  it('idle, walk and interact frames differ', () => {
    const idle = JSON.stringify(frames[0]);
    const walk = JSON.stringify(frames[4]);
    const interact = JSON.stringify(frames[10]);
    expect(idle).not.toBe(walk);
    expect(walk).not.toBe(interact);
  });
});
