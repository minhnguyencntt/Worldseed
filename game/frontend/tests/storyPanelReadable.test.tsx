// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { StoryPanel } from '../src/components/StoryPanel';
import { useGameStore } from '../src/store/gameStore';

// Seeds the shared game store; the active node is the bundled 'intro' node (speaker 'boy').
function seed() {
  useGameStore.getState().hydrate();
}

describe('StoryPanel dialog readability', () => {
  afterEach(() => {
    cleanup();
  });

  it('gives the panel root the story-content class without the h-full and text-sm classes', () => {
    // Given the active node has two choices,
    // when StoryPanel renders,
    // then the root carries story-content and not the h-full + text-sm pair.
    seed();
    const { container } = render(<StoryPanel />);

    expect(container.firstChild).toHaveClass('story-content');
    expect(container.firstChild).not.toHaveClass('h-full', 'text-sm');
  });

  it('renders the speaker as a font-pixel heading inside the Dialogue region', () => {
    // Given the active node is spoken by 'boy',
    // when StoryPanel renders,
    // then the speaker heading is named 'boy' and carries the font-pixel class.
    seed();
    render(<StoryPanel />);

    const dialogue = screen.getByRole('region', { name: 'Dialogue' });
    expect(within(dialogue).getByRole('heading', { name: 'boy' })).toHaveClass('font-pixel');
  });

  it('renders every choice button full width', () => {
    // Given the active node has the choices 'Look around the room' and "Let's explore",
    // when StoryPanel renders,
    // then both choice buttons carry the w-full class.
    seed();
    render(<StoryPanel />);

    expect(screen.getByRole('button', { name: 'Look around the room' })).toHaveClass('w-full');
    expect(screen.getByRole('button', { name: "Let's explore" })).toHaveClass('w-full');
  });
});
