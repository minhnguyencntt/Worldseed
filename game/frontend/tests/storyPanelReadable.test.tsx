// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { StoryPanel } from '../src/components/StoryPanel';
import type { DialogueNode } from '../../src/state/types';

const readableNode: DialogueNode = {
  id: 'n',
  speaker: 'boy',
  text: 'Hi',
  choices: [{ text: 'A' }, { text: 'B' }],
};

describe('StoryPanel dialog readability', () => {
  afterEach(() => {
    cleanup();
  });

  it('gives the panel root the story-content class without the h-full and text-sm classes', () => {
    // Given a dialogue node with two choices,
    // when StoryPanel renders,
    // then the root carries story-content and not the h-full + text-sm pair.
    const { container } = render(
      <StoryPanel sceneTitle="The Boys Room" node={readableNode} history={[]} inventory={[]} onChoose={vi.fn()} />,
    );

    expect(container.firstChild).toHaveClass('story-content');
    expect(container.firstChild).not.toHaveClass('h-full', 'text-sm');
  });

  it('renders the speaker as a font-pixel heading inside the Dialogue region', () => {
    // Given a dialogue node spoken by 'boy',
    // when StoryPanel renders,
    // then the speaker heading is named 'boy' and carries the font-pixel class.
    render(
      <StoryPanel sceneTitle="The Boys Room" node={readableNode} history={[]} inventory={[]} onChoose={vi.fn()} />,
    );

    const dialogue = screen.getByRole('region', { name: 'Dialogue' });
    expect(within(dialogue).getByRole('heading', { name: 'boy' })).toHaveClass('font-pixel');
  });

  it('renders every choice button full width', () => {
    // Given a dialogue node with choices 'A' and 'B',
    // when StoryPanel renders,
    // then both choice buttons carry the w-full class.
    render(
      <StoryPanel sceneTitle="The Boys Room" node={readableNode} history={[]} inventory={[]} onChoose={vi.fn()} />,
    );

    expect(screen.getByRole('button', { name: 'A' })).toHaveClass('w-full');
    expect(screen.getByRole('button', { name: 'B' })).toHaveClass('w-full');
  });
});
