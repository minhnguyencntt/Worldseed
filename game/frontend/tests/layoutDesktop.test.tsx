// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { cleanup } from '@testing-library/react';

describe('GameLayout desktop stylesheet', () => {
  afterEach(() => {
    cleanup();
  });

  it('stylesheet overflow rule: Given the game stylesheet on disk, when it is read, then html, body and #root are fixed to 100% height with overflow hidden', () => {
    // Given src/styles.css read from the frontend package root (vitest cwd),
    // when its text is matched,
    // then the html, body and #root selector block sets height: 100% and overflow: hidden.
    const css = readFileSync(join(process.cwd(), 'src', 'styles.css'), 'utf8');

    expect(css).toMatch(/html,\s*body,\s*#root\s*\{[^}]*height:\s*100%[^}]*overflow:\s*hidden/);
  });
});
