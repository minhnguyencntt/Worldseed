import { describe, it, expect } from 'vitest';
import { buildSpriteSheet, type SpriteFrame } from '../src/lib/spriteSheet';
import { gridToRgba } from '../src/lib/gridToRgba';
import { PALETTE } from '../src/lib/palette';

const FRAME_W = 32;
const FRAME_H = 48;

function filledFrame(index: number): SpriteFrame {
  const grid = Array.from({ length: FRAME_H }, () => Array.from({ length: FRAME_W }, () => index));
  return gridToRgba(grid);
}

function fourFrames(): SpriteFrame[] {
  return [0, 1, 2, 3].map(filledFrame);
}

function rgbAt(sheet: { width: number; data: Uint8ClampedArray }, x: number, y: number): [number, number, number] {
  const o = (y * sheet.width + x) * 4;
  return [sheet.data[o], sheet.data[o + 1], sheet.data[o + 2]];
}

function hexToRgb(hex: string): [number, number, number] {
  return [parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16)];
}

describe("buildSpriteSheet size and layout", () => {
  it('size and count: four 32x48 frames produce a 128x48 sheet with frameCount 4', () => {
    const sheet = buildSpriteSheet(fourFrames());
    expect(sheet).toMatchObject({ width: 128, height: 48, frameWidth: 32, frameHeight: 48, frameCount: 4 });
  });

  it('placement: each frame i is drawn at x offset i*32 with its palette colour', () => {
    const sheet = buildSpriteSheet(fourFrames());
    for (let i = 0; i < 4; i++) {
      expect(rgbAt(sheet, i * 32 + 5, 10)).toEqual(hexToRgb(PALETTE[i]));
    }
  });
});

describe('buildSpriteSheet palette, errors, determinism', () => {
  it('palette: every pixel of the 4-frame sheet is one of the PALETTE colours', () => {
    const sheet = buildSpriteSheet(fourFrames());
    const allowed = new Set(PALETTE.map(hexToRgb).map((c) => c.join(',')));
    for (let o = 0; o < sheet.data.length; o += 4) {
      const key = [sheet.data[o], sheet.data[o + 1], sheet.data[o + 2]].join(',');
      expect(allowed.has(key)).toBe(true);
    }
  });

  it('errors: an empty frame list throws', () => {
    expect(() => buildSpriteSheet([])).toThrow();
  });

  it('errors: frames of 2x2 and 3x2 mixed in one sheet throw', () => {
    const a = gridToRgba([[0, 0], [0, 0]]);
    const b = gridToRgba([[0, 0, 0], [0, 0, 0]]);
    expect(() => buildSpriteSheet([a, b])).toThrow();
  });

  it('determinism: two calls on the same frames produce equal pixel data', () => {
    const frames = fourFrames();
    const first = Array.from(buildSpriteSheet(frames).data);
    const second = Array.from(buildSpriteSheet(frames).data);
    expect(second).toEqual(first);
  });

  it('non-mutation: input frame data arrays are unchanged after the call', () => {
    const frames = fourFrames();
    const before = frames.map((f) => Array.from(f.data));
    buildSpriteSheet(frames);
    expect(frames.map((f) => Array.from(f.data))).toEqual(before);
  });
});
