import { PALETTE_RAMPS } from './palette';

export const COLOR_TOKENS = {
  ink: PALETTE_RAMPS.indigo,
  plum: PALETTE_RAMPS.plum,
  moon: PALETTE_RAMPS.moon,
  hoodie: PALETTE_RAMPS.hoodie,
  wood: PALETTE_RAMPS.wood,
  brass: PALETTE_RAMPS.brass,
  parchment: PALETTE_RAMPS.parchment,
  lamp: PALETTE_RAMPS.lamp,
} as const;

export const SPACING_TOKENS = {
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  6: '24px',
} as const;

export const TYPE_TOKENS = {
  fontPixel: "'Press Start 2P', monospace",
  fontBody: "'VT323', monospace",
  sizeSm: '12px',
  sizeMd: '16px',
  sizeLg: '24px',
} as const;

export function tokensToCssVars(): Record<string, string> {
  const vars: Record<string, string> = {};
  for (const [ramp, steps] of Object.entries(COLOR_TOKENS)) {
    steps.forEach((hex, i) => {
      vars[`--sf-color-${ramp}-${i + 1}`] = hex;
    });
  }
  for (const [n, value] of Object.entries(SPACING_TOKENS)) {
    vars[`--sf-space-${n}`] = value;
  }
  vars['--sf-font-pixel'] = TYPE_TOKENS.fontPixel;
  vars['--sf-font-body'] = TYPE_TOKENS.fontBody;
  vars['--sf-size-sm'] = TYPE_TOKENS.sizeSm;
  vars['--sf-size-md'] = TYPE_TOKENS.sizeMd;
  vars['--sf-size-lg'] = TYPE_TOKENS.sizeLg;
  return vars;
}
