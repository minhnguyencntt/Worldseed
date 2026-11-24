import { describe, it, expect } from 'vitest';
import { PALETTE, PALETTE_RAMPS, WARM_RAMPS, COOL_RAMPS } from '../src/lib/palette';

describe('palette module', () => {
  it('has at most 48 unique hex colours', () => {
    expect(PALETTE.length).toBeLessThanOrEqual(48);
    expect(new Set(PALETTE).size).toBe(PALETTE.length);
    for (const hex of PALETTE) {
      expect(hex).toMatch(/^#[0-9a-f]{6}$/);
    }
  });

  it('names warm and cool ramps', () => {
    const rampNames = Object.keys(PALETTE_RAMPS);
    const warm: string[] = [...WARM_RAMPS];
    const cool: string[] = [...COOL_RAMPS];

    for (const name of [...warm, ...cool]) {
      expect(rampNames).toContain(name);
    }
    const shared = warm.filter((name) => cool.includes(name));
    expect(shared).toEqual([]);
    expect([...warm, ...cool].sort()).toEqual([...rampNames].sort());
  });
});
