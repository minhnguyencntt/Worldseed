import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import tailwindConfig from '../tailwind.config';
import postcssConfig from '../postcss.config.js';

describe('Tailwind configuration', () => {
  it('config exposes content globs and token colors', () => {
    // Given the Tailwind config module,
    // when it is imported,
    // then content globs cover index.html and src, and theme colors map to CSS variables.
    expect(tailwindConfig.content).toEqual(['./index.html', './src/**/*.{ts,tsx}']);
    expect(tailwindConfig.theme?.extend?.colors?.background).toBe('hsl(var(--background))');
    expect(tailwindConfig.theme?.extend?.colors?.primary?.DEFAULT).toBe('hsl(var(--primary))');
  });

  it('postcss registers tailwind', () => {
    // Given the PostCSS config module,
    // when it is imported,
    // then tailwindcss and autoprefixer are registered as plugins in that order.
    expect(Object.keys(postcssConfig.plugins)).toEqual(['tailwindcss', 'autoprefixer']);
  });

  it('styles.css has directives and tokens', () => {
    // Given src/styles.css on disk,
    // when it is read,
    // then it contains Tailwind layer directives, the root color tokens and the layout classes.
    const css = readFileSync(join(process.cwd(), 'src', 'styles.css'), 'utf8');
    for (const token of [
      '@tailwind base',
      '@tailwind components',
      '@tailwind utilities',
      '--background:',
      '--foreground:',
      '--primary:',
      '.game-layout',
      '.story-panel',
    ]) {
      expect(css).toContain(token);
    }
  });
});
