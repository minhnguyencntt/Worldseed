// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { StoryPanel } from '../src/components/StoryPanel';
import type { DialogueNode } from '../../src/state/types';

const boyNode: DialogueNode = {
  id: 'intro',
  speaker: 'boy',
  text: "I don't know what to do next. What should we do?",
  choices: [{ text: 'Look around the room' }, { text: "Let's explore" }],
};

const ghostNode: DialogueNode = {
  id: 'whisper',
  speaker: 'ghost',
  text: 'Behind you...',
  choices: [{ text: 'Turn around' }, { text: 'Keep still' }],
};

describe('StoryPanel dialogue card', () => {
  afterEach(() => {
    cleanup();
  });

  it('shows a 32px boy portrait inside the Dialogue region', () => {
    // Given a node spoken by 'boy',
    // when StoryPanel renders it,
    // then an img of width 32 pointing at boy-portrait.png is inside the Dialogue region.
    render(
      <StoryPanel sceneTitle="The Boys Room" node={boyNode} history={[]} inventory={[]} onChoose={vi.fn()} />,
    );

    const dialogue = screen.getByRole('region', { name: 'Dialogue' });
    // alt="" makes the img role "presentation", so locate it by tag inside the region.
    const img = dialogue.querySelector('img');
    expect(img).not.toBeNull();
    expect(img).toHaveAttribute('width', '32');
    expect(img.getAttribute('src')).toMatch(/boy-portrait\.png$/);
  });

  it('renders no portrait image for a speaker without a manifest portrait, but keeps speaker and line', () => {
    // Given a node spoken by 'ghost', which has no portrait,
    // when StoryPanel renders it,
    // then no img is rendered and the speaker name and line still appear.
    const { container } = render(
      <StoryPanel sceneTitle="The Boys Room" node={ghostNode} history={[]} inventory={[]} onChoose={vi.fn()} />,
    );

    expect(container.querySelector('img[src*="boy-portrait"]')).toBeNull();
    expect(container.querySelector('.dialogue img')).toBeNull();
    const dialogue = screen.getByRole('region', { name: 'Dialogue' });
    expect(within(dialogue).getByRole('heading', { level: 2, name: 'ghost' })).toBeInTheDocument();
    expect(within(dialogue).getByText('Behind you...')).toBeInTheDocument();
  });

  it('calls onChoose with 1 when the second button in the Choices list is clicked', () => {
    // Given a node with two choices,
    // when the second choice button is clicked,
    // then onChoose is called once with index 1.
    const onChoose = vi.fn();
    render(
      <StoryPanel sceneTitle="The Boys Room" node={boyNode} history={[]} inventory={[]} onChoose={onChoose} />,
    );

    const choices = screen.getByRole('list', { name: 'Choices' });
    const buttons = within(choices).getAllByRole('button');
    expect(buttons).toHaveLength(2);
    fireEvent.click(buttons[1]);

    expect(onChoose).toHaveBeenCalledTimes(1);
    expect(onChoose).toHaveBeenCalledWith(1);
  });

  it('shows the scene title heading and no Dialogue region when there is no node', () => {
    // Given no current node,
    // when StoryPanel renders,
    // then the scene title is an h1 and no Dialogue region exists.
    render(
      <StoryPanel sceneTitle="The Boys Room" node={undefined} history={[]} inventory={[]} onChoose={vi.fn()} />,
    );

    expect(screen.getByRole('heading', { level: 1, name: 'The Boys Room' })).toBeInTheDocument();
    expect(screen.queryByRole('region', { name: 'Dialogue' })).not.toBeInTheDocument();
  });

  it('gives the panel root the sf-frame-panel class', () => {
    // Given any StoryPanel render,
    // when inspecting the root element,
    // then it carries the sf-frame-panel class.
    const { container } = render(
      <StoryPanel sceneTitle="The Boys Room" node={boyNode} history={[]} inventory={[]} onChoose={vi.fn()} />,
    );

    expect(container.firstElementChild).toHaveClass('sf-frame-panel');
  });
});
