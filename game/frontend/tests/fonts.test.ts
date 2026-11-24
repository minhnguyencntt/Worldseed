import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const read = (rel: string) => readFileSync(join(process.cwd(), rel), 'utf8');

const FONT_URL = /https?:\/\/[^\s'"]*font/i;

describe('bundled fonts', () => {
  it('declares the pixel fonts as npm dependencies in package.json', () => {
    // Given the frontend package manifest,
    // when its dependencies are read from disk,
    // then both pixel fonts are listed as @fontsource packages.
    const pkg = JSON.parse(read('package.json')) as { dependencies: Record<string, string> };
    expect(pkg.dependencies).toHaveProperty('@fontsource/press-start-2p');
    expect(pkg.dependencies).toHaveProperty('@fontsource/vt323');
  });

  it('imports both font stylesheets locally from src/main.tsx', () => {
    // Given the application entry point,
    // when its source is read from disk,
    // then it imports both fonts from the installed npm packages.
    const main = read('src/main.tsx');
    expect(main).toContain('@fontsource/press-start-2p/400.css');
    expect(main).toContain('@fontsource/vt323/400.css');
  });

  it('references no remote font URLs in styles, html or tokens', () => {
    // Given the stylesheet, HTML shell and design token sources,
    // when they are read from disk,
    // then none of them loads a font from an http(s) URL or Google Fonts.
    for (const rel of ['src/styles.css', 'index.html', 'src/lib/tokens.ts']) {
      const source = read(rel);
      expect(source, `${rel} must not reference a remote font URL`).not.toMatch(FONT_URL);
      expect(source, `${rel} must not reference Google Fonts`).not.toContain('fonts.googleapis');
    }
  });
});
