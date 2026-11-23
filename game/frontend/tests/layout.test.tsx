// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { GameLayout } from '../src/components/GameLayout';
import { StoryPanel } from '../src/components/StoryPanel';
import { useUiStore } from '../src/store/uiStore';

describe('GameLayout drawer toggle and styles', () => {
  beforeEach(() => {
    useUiStore.setState({ drawerOpen: false });
  });

  afterEach(() => {
    cleanup();
  });

  it('Given a closed story drawer, when the Story button is clicked twice, then aria-expanded, the store drawerOpen flag and aside data-state toggle true then false and the scene stays mounted', () => {
    const { container } = render(
      <GameLayout
        scene={<div data-testid="scene-node">Scene</div>}
        story={<div data-testid="story-node">Story text</div>}
      />,
    );

    const toggle = screen.getByRole('button', { name: 'Story' });
    const aside = container.querySelector('aside');
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(useUiStore.getState().drawerOpen).toBe(false);
    expect(aside).toHaveAttribute('data-state', 'closed');
    expect(screen.getByTestId('scene-node')).toBeInTheDocument();

    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(useUiStore.getState().drawerOpen).toBe(true);
    expect(aside).toHaveAttribute('data-state', 'open');
    expect(screen.getByTestId('scene-node')).toBeInTheDocument();

    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(useUiStore.getState().drawerOpen).toBe(false);
    expect(aside).toHaveAttribute('data-state', 'closed');
    expect(screen.getByTestId('scene-node')).toBeInTheDocument();
  });

  it('Given the game stylesheet, when it is read from disk, then legacy layout classes and the 768px breakpoint are absent and the contribution sheet remains', () => {
    // Vitest runs from game/frontend (see the step's run command), so resolve from cwd.
    const css = readFileSync(join(process.cwd(), 'src', 'styles.css'), 'utf8');

    expect(css).not.toContain('.game-layout');
    expect(css).not.toContain('.story-panel');
    expect(css).not.toContain('.scene-area');
    expect(css).not.toContain('@media (max-width: 768px)');
    expect(css).toContain('.contribution-sheet');
  });

  it('Given GameLayout wrapping StoryPanel, when rendered, then exactly one aside exists', () => {
    const { container } = render(
      <GameLayout
        scene={<div />}
        story={<StoryPanel node={undefined} history={[]} inventory={[]} onChoose={() => {}} />}
      />,
    );

    expect(container.querySelectorAll('aside')).toHaveLength(1);
  });

  it('Given the Story button clicked, when open, then only the aside has data-state open and StoryPanel root is story-content', () => {
    const { container } = render(
      <GameLayout
        scene={<div />}
        story={<StoryPanel node={undefined} history={[]} inventory={[]} onChoose={() => {}} />}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Story' }));
    const aside = container.querySelector('aside');
    expect(aside).toHaveAttribute('data-state', 'open');
    expect(container.querySelectorAll('[data-state="open"]')).toHaveLength(1);
    const content = container.querySelector('.story-content');
    expect(content).not.toBeNull();
    expect(content).not.toHaveClass('story-panel');
  });
});
