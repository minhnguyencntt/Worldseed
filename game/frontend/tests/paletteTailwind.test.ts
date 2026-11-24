import { describe, it, expect } from 'vitest';
import { PALETTE, paletteTailwindColors } from '../src/lib/palette';
import tailwindConfig from '../tailwind.config';

describe('paletteTailwindColors', () => {
  it('flattens to every palette colour once', () => {
    const flattened = Object.values(paletteTailwindColors).flatMap((ramp) => Object.values(ramp));
    expect([...flattened].sort()).toEqual([...PALETTE].sort());
  });
});

describe('tailwind.config palette export', () => {
  it('registers the palette ramps under theme.extend.colors.pal and keeps the background token', () => {
    const colors = tailwindConfig.theme?.extend?.colors as Record<string, unknown> | undefined;
    expect(colors?.pal).toEqual(paletteTailwindColors);
    expect(colors?.background).toBe('hsl(var(--background))');
  });
});
