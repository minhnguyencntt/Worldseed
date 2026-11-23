// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { GameLayout } from '../src/components/GameLayout';

describe('GameLayout drawer toggle and styles', () => {
  afterEach(() => {
    cleanup();
  });

  it('Given a closed story drawer, when the Story button is clicked twice, then aria-expanded toggles true then false and the scene stays mounted', () => {
    render(
      <GameLayout
        scene={<div data-testid="scene-node">Scene</div>}
        story={<div data-testid="story-node">Story text</div>}
      />,
    );

    const toggle = screen.getByRole('button', { name: 'Story' });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(screen.getByTestId('scene-node')).toBeInTheDocument();

    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByTestId('scene-node')).toBeInTheDocument();

    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(screen.getByTestId('scene-node')).toBeInTheDocument();
  });

  it('Given the game stylesheet, when it is read from disk, then it declares scrollable story overflow and a 768px mobile breakpoint', () => {
    // Vitest runs from game/frontend (see the step's run command), so resolve from cwd.
    const css = readFileSync(join(process.cwd(), 'src', 'styles.css'), 'utf8');

    expect(css).toContain('overflow-y: auto');
    expect(css).toContain('@media (max-width: 768px)');
  });
});
