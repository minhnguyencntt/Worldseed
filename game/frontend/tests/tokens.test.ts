import { describe, expect, it } from 'vitest';
import { PALETTE, PALETTE_RAMPS } from '../src/lib/palette';
import { COLOR_TOKENS, tokensToCssVars } from '../src/lib/tokens';
import tailwindConfig from '../tailwind.config';

describe('design tokens', () => {
  it('colour tokens come from the palette', () => {
    // Given every colour token ramp,
    // when its hex values are flattened,
    // then each value is a colour that exists in the shared PALETTE.
    const tokenHexes = Object.values(COLOR_TOKENS).flatMap((steps) => [...steps]);
    expect(tokenHexes.length).toBeGreaterThan(0);
    for (const hex of tokenHexes) {
      expect(PALETTE).toContain(hex);
    }
  });

  it('css vars', () => {
    // Given the token-to-CSS-variable mapping,
    // when tokensToCssVars is called,
    // then brass step 4 equals the palette brass[3], space-2 is 8px and the pixel font stack names Press Start 2P.
    const vars = tokensToCssVars();
    expect(vars['--sf-color-brass-4']).toBe(PALETTE_RAMPS.brass[3]);
    expect(vars['--sf-space-2']).toBe('8px');
    expect(vars['--sf-font-pixel']).toContain('Press Start 2P');
  });

  it('tailwind config exposes tokens', () => {
    // Given the Tailwind config module,
    // when its theme.extend block is read,
    // then colours, spacing and pixel font point at CSS variables and background keeps its HSL token.
    // Adapted: colours are nested per ramp (sf.brass['4']), not flattened to 'brass-4'.
    const extend = tailwindConfig.theme?.extend as
      | {
          colors?: Record<string, any>;
          spacing?: Record<string, string>;
          fontFamily?: Record<string, string | string[]>;
        }
      | undefined;
    expect(extend?.colors?.sf?.brass?.['4']).toBe('var(--sf-color-brass-4)');
    expect(extend?.spacing?.['sf-2']).toBe('var(--sf-space-2)');
    expect(extend?.fontFamily?.pixel).toBe('var(--sf-font-pixel)');
    expect(extend?.colors?.background).toBe('hsl(var(--background))');
  });
});
