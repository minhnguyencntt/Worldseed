// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { IntroScreen } from '../src/components/IntroScreen';
import { StoryPanel } from '../src/components/StoryPanel';
import type { DialogueNode } from '../../src/state/types';

// Mirrors the `intro` node in game/content/worlds/the-boys-room/scenes/bedroom.yaml.
const introNode: DialogueNode = {
  id: 'intro',
  speaker: 'boy',
  text: "I don't know what to do next. What should we do?",
  choices: [{ text: 'Look around the room' }, { text: "Let's explore" }],
};

describe('intro copy and choices', () => {
  afterEach(() => {
    cleanup();
  });

  it('IntroScreen shows the "You decide." line', () => {
    render(<IntroScreen onBegin={vi.fn()} />);

    expect(screen.getByText('You decide.')).toBeInTheDocument();
  });

  it('IntroScreen calls onBegin when the Begin button is clicked', () => {
    const onBegin = vi.fn();
    render(<IntroScreen onBegin={onBegin} />);

    fireEvent.click(screen.getByRole('button', { name: 'Begin' }));

    expect(onBegin).toHaveBeenCalledTimes(1);
  });

  it('StoryPanel calls onChoose with 0 when the first choice is clicked', () => {
    const onChoose = vi.fn();
    render(
      <StoryPanel node={introNode} history={[]} inventory={[]} onChoose={onChoose} />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Look around the room' }));

    expect(onChoose).toHaveBeenCalledWith(0);
  });

  it('StoryPanel shows "Empty" when the inventory is empty', () => {
    render(
      <StoryPanel node={introNode} history={[]} inventory={[]} onChoose={vi.fn()} />,
    );

    expect(screen.getByText('Empty')).toBeInTheDocument();
  });

  it('StoryPanel lists the item name when the inventory holds "key"', () => {
    render(
      <StoryPanel node={introNode} history={[]} inventory={['key']} onChoose={vi.fn()} />,
    );

    expect(screen.getByText('key')).toBeInTheDocument();
    expect(screen.queryByText('Empty')).not.toBeInTheDocument();
  });
});
