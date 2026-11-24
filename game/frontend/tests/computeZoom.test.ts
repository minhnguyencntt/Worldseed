import { describe, expect, it, vi } from 'vitest';

vi.mock('phaser', () => ({
  default: {
    AUTO: 0,
    Scale: { FIT: 3, CENTER_BOTH: 1 },
    Game: class {},
    Scene: class {},
  },
}));

import { computeZoom } from '../src/phaser/config';

describe('computeZoom whole-number scaling', () => {
  it.each([
    [1280, 720, 1, 2],
    [1920, 1080, 1, 4],
    [1920, 1080, 2, 8],
    [1366, 768, 1, 2],
    [1280, 720, 1.5, 4],
    [1000, 600, 2, 4],
    [479, 269, 1, 1],
  ])(
    'returns the integer zoom %i x %i at dpr %s as %i',
    (w, h, dpr, expected) => {
      const zoom = computeZoom(w, h, dpr);

      expect(zoom).toBe(expected);
      expect(Number.isInteger(zoom)).toBe(true);
    },
  );

  it.each([0, -1, NaN, Infinity])(
    'falls back to dpr 1 when dpr is %s',
    (dpr) => {
      expect(computeZoom(1280, 720, dpr)).toBe(computeZoom(1280, 720, 1));
      expect(computeZoom(1280, 720, dpr)).toBe(2);
    },
  );
});
