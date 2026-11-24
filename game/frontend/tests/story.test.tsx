// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { IntroScreen } from '../src/components/IntroScreen';
import { StoryPanel } from '../src/components/StoryPanel';
import { useGameStore } from '../src/store/gameStore';

// Seeds the shared game store (inventory ids) with the bundled opening node ('intro').
function seed(inventory: string[] = []) {
  useGameStore.getState().hydrate();
  useGameStore.getState().setState((prev) => ({ ...prev, inventory }));
}

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

  it('StoryPanel moves the store to the look-around node when the first choice is clicked', () => {
    seed();
    render(<StoryPanel />);

    fireEvent.click(screen.getByRole('button', { name: 'Look around the room' }));

    expect(useGameStore.getState().state?.activeDialogue).toBe('look-around');
  });

  it('StoryPanel renders six empty inventory slots when the inventory is empty', () => {
    seed([]);
    render(<StoryPanel />);

    const slots = within(screen.getByRole('region', { name: 'Inventory' })).getAllByRole('listitem');
    expect(slots).toHaveLength(6);
    for (const slot of slots) {
      expect(slot).toHaveAttribute('data-empty', 'true');
    }
  });

  it('StoryPanel lists the humanised item name in the first slot when the inventory holds "old-key"', () => {
    seed(['old-key']);
    render(<StoryPanel />);

    const slots = within(screen.getByRole('region', { name: 'Inventory' })).getAllByRole('listitem');
    expect(slots).toHaveLength(6);
    expect(slots[0]).toHaveTextContent('Old Key');
    expect(slots[0]).not.toHaveTextContent('old-key');
  });
});
