import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';
import { paletteTailwindColors } from './src/lib/palette';
export default { darkMode: 'class', content: ['./index.html','./src/**/*.{ts,tsx}'], theme: { extend: { colors: { background:'hsl(var(--background))', foreground:'hsl(var(--foreground))', primary:{DEFAULT:'hsl(var(--primary))',foreground:'hsl(var(--primary-foreground))'}, muted:'hsl(var(--muted))', border:'hsl(var(--border))', pal: paletteTailwindColors }, borderRadius: { lg:'var(--radius)' } } }, plugins: [animate] } satisfies Config;
