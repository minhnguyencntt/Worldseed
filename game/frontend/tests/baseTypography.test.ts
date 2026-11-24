import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const css = readFileSync(resolve(__dirname, '../src/styles.css'), 'utf8');

describe('base typography and backdrop CSS', () => {
  // Scenario: Given src/styles.css, When it is read, Then the base body, heading and backdrop/dialog rules are present.
  it('base rules: body uses the ink background and parchment text at 20px, headings use the pixel font, and the dialog and fullscreen backdrop classes exist', () => {
    expect(css).toMatch(/body\s*{[^}]*var\(--sf-color-ink-1\)/);
    expect(css).toMatch(/var\(--sf-color-parchment-5\)/);
    expect(css).toMatch(/font-size:\s*20px/);
    expect(css).toMatch(/h1, h2\s*{[^}]*--sf-font-pixel/);
    expect(css).toContain('.sf-dialog');
    expect(css).toContain('.sf-fullscreen-bg');
  });
});
