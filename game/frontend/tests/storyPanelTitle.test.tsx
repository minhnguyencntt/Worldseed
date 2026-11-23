// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { StoryPanel } from '../src/components/StoryPanel';
import type { DialogueNode } from '../../src/state/types';

// Mirrors the `intro` node in game/content/worlds/the-boys-room/scenes/bedroom.yaml.
const introNode: DialogueNode = {
  id: 'intro',
  speaker: 'boy',
  text: "I don't know what to do next. What should we do?",
  choices: [{ text: 'Look around the room' }, { text: "Let's explore" }],
};

describe('StoryPanel scene title and choices', () => {
  afterEach(() => {
    cleanup();
  });

  it('shows the scene title as the heading', () => {
    render(
      <StoryPanel
        sceneTitle="The Boys Room"
        node={introNode}
        history={['a', 'b']}
        inventory={['key']}
        onChoose={vi.fn()}
      />,
    );

    expect(screen.getByRole('heading', { level: 1, name: 'The Boys Room' })).toBeInTheDocument();
  });

  it('lists both history entries in the Story history list', () => {
    render(
      <StoryPanel
        sceneTitle="The Boys Room"
        node={introNode}
        history={['a', 'b']}
        inventory={['key']}
        onChoose={vi.fn()}
      />,
    );

    const history = screen.getByRole('list', { name: 'Story history' });
    expect(within(history).getAllByRole('listitem')).toHaveLength(2);
  });

  it('shows the inventory item inside the Inventory region', () => {
    render(
      <StoryPanel
        sceneTitle="The Boys Room"
        node={introNode}
        history={['a', 'b']}
        inventory={['key']}
        onChoose={vi.fn()}
      />,
    );

    const inventory = screen.getByRole('region', { name: 'Inventory' });
    expect(within(inventory).getByText('key')).toBeInTheDocument();
  });

  it('keeps the panel root scrollable with the overflow-y-auto class', () => {
    const { container } = render(
      <StoryPanel
        sceneTitle="The Boys Room"
        node={introNode}
        history={['a', 'b']}
        inventory={['key']}
        onChoose={vi.fn()}
      />,
    );

    expect(container.firstElementChild).toHaveClass('overflow-y-auto');
  });

  it('calls onChoose with 1 when the second choice is clicked', () => {
    const onChoose = vi.fn();
    render(
      <StoryPanel
        sceneTitle="The Boys Room"
        node={introNode}
        history={['a', 'b']}
        inventory={['key']}
        onChoose={onChoose}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: "Let's explore" }));

    expect(onChoose).toHaveBeenCalledTimes(1);
    expect(onChoose).toHaveBeenCalledWith(1);
  });
});
