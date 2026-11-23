// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { GameLayout } from '../src/components/GameLayout';

describe('GameLayout desktop classes', () => {
  afterEach(() => {
    cleanup();
  });

  it('root grid classes: Given GameLayout with a scene and a story, when rendered, then the root grid, the aside scroll container and the main min-width rule are applied', () => {
    // Given GameLayout rendered with a scene node and a story node,
    // when the DOM is inspected,
    // then the root element is a full-height grid that hides overflow with a 4fr/1fr desktop split,
    // the aside scrolls vertically and is full viewport height on md+,
    // and the main column has min-w-0 so the grid track can shrink.
    const { container } = render(<GameLayout scene={<div />} story={<div />} />);

    expect(container.firstElementChild).toHaveClass(
      'grid',
      'h-screen',
      'overflow-hidden',
      'md:grid-cols-[4fr_1fr]',
    );

    const aside = container.querySelector('aside');
    expect(aside).not.toBeNull();
    expect(aside).toHaveClass('overflow-y-auto', 'md:h-screen');

    const main = container.querySelector('main');
    expect(main).not.toBeNull();
    expect(main).toHaveClass('min-w-0');
  });

  it('stylesheet overflow rule: Given the game stylesheet on disk, when it is read, then html, body and #root are fixed to 100% height with overflow hidden', () => {
    // Given src/styles.css read from the frontend package root (vitest cwd),
    // when its text is matched,
    // then the html, body and #root selector block sets height: 100% and overflow: hidden.
    const css = readFileSync(join(process.cwd(), 'src', 'styles.css'), 'utf8');

    expect(css).toMatch(/html,\s*body,\s*#root\s*\{[^}]*height:\s*100%[^}]*overflow:\s*hidden/);
  });
});
