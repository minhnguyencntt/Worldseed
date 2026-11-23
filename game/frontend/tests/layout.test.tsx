// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { GameLayout } from '../src/components/GameLayout';
import { StoryPanel } from '../src/components/StoryPanel';

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

  it('Given GameLayout wrapping StoryPanel, when rendered, then exactly one .story-panel exists', () => {
    const { container } = render(
      <GameLayout
        scene={<div />}
        story={<StoryPanel node={undefined} history={[]} inventory={[]} onChoose={() => {}} />}
      />,
    );

    expect(container.querySelectorAll('.story-panel')).toHaveLength(1);
  });

  it('Given the Story button clicked, when open, then only the aside has drawer-open and StoryPanel root is story-content', () => {
    const { container } = render(
      <GameLayout
        scene={<div />}
        story={<StoryPanel node={undefined} history={[]} inventory={[]} onChoose={() => {}} />}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Story' }));
    const panel = container.querySelector('.story-panel');
    expect(panel).toHaveClass('drawer-open');
    expect(container.querySelectorAll('.drawer-open')).toHaveLength(1);
    const content = container.querySelector('.story-content');
    expect(content).not.toBeNull();
    expect(content).not.toHaveClass('story-panel');
  });
});
