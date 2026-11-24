import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';
import animate from 'tailwindcss-animate';
import { paletteTailwindColors } from './src/lib/palette';
import { COLOR_TOKENS, SPACING_TOKENS, TYPE_TOKENS, tokensToCssVars } from './src/lib/tokens';

const sfColors = Object.fromEntries(
  Object.entries(COLOR_TOKENS).map(([ramp, steps]) => [
    ramp,
    Object.fromEntries(steps.map((_, i) => [String(i + 1), `var(--sf-color-${ramp}-${i + 1})`])),
  ]),
);
const sfSpacing = Object.fromEntries(
  Object.keys(SPACING_TOKENS).map((n) => [`sf-${n}`, `var(--sf-space-${n})`]),
);

export default { darkMode: 'class', content: ['./index.html','./src/**/*.{ts,tsx}'], theme: { extend: { colors: { background:'hsl(var(--background))', foreground:'hsl(var(--foreground))', primary:{DEFAULT:'hsl(var(--primary))',foreground:'hsl(var(--primary-foreground))'}, muted:'hsl(var(--muted))', border:'hsl(var(--border))', pal: paletteTailwindColors, sf: sfColors }, spacing: sfSpacing, fontFamily: { pixel: 'var(--sf-font-pixel)', body: 'var(--sf-font-body)' }, fontSize: { 'sf-sm': 'var(--sf-size-sm)', 'sf-md': 'var(--sf-size-md)', 'sf-lg': 'var(--sf-size-lg)' }, borderRadius: { lg:'var(--radius)' } } }, plugins: [animate, plugin(({ addBase }) => addBase({ ':root': tokensToCssVars(), body: { fontFamily: 'var(--sf-font-body)' } }))] } satisfies Config;
