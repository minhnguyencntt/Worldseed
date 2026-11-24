// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { StoryPanel } from '../src/components/StoryPanel';
import { scene } from '../src/runtime/content';
import { useGameStore } from '../src/store/gameStore';

// Seeds the shared game store (history and inventory) with the opening dialogue node ('intro').
function seed(history: string[], inventory: string[]) {
  useGameStore.getState().hydrate();
  useGameStore.getState().setState((prev) => ({ ...prev, history, inventory }));
}

describe('StoryPanel scene title and choices', () => {
  afterEach(() => {
    cleanup();
  });

  it('shows the scene title as the heading', () => {
    // Given the bundled scene title (scene.title from runtime/content),
    // when StoryPanel renders from the store,
    // then that title is the h1 heading.
    seed(['a', 'b'], ['key']);
    render(<StoryPanel />);

    expect(screen.getByRole('heading', { level: 1, name: scene.title })).toBeInTheDocument();
  });

  it('lists both history entries in the Story history list', () => {
    seed(['a', 'b'], ['key']);
    render(<StoryPanel />);

    const history = screen.getByRole('list', { name: 'Story history' });
    expect(within(history).getAllByRole('listitem')).toHaveLength(2);
  });

  it('shows the inventory item inside the Inventory region', () => {
    seed(['a', 'b'], ['key']);
    render(<StoryPanel />);

    const inventory = screen.getByRole('region', { name: 'Inventory' });
    // Inventory ids are rendered humanised ('key' -> 'Key') by buildInventorySlots.
    expect(within(inventory).getByText('Key')).toBeInTheDocument();
  });

  it('keeps the panel root scrollable with the overflow-y-auto class', () => {
    seed(['a', 'b'], ['key']);
    const { container } = render(<StoryPanel />);

    expect(container.firstElementChild).toHaveClass('overflow-y-auto');
  });

  it('chooses the second choice of the intro node and moves the store to the explore node', () => {
    seed(['a', 'b'], ['key']);
    render(<StoryPanel />);

    const choices = screen.getByRole('list', { name: 'Choices' });
    fireEvent.click(within(choices).getByRole('button', { name: "Let's explore" }));

    expect(useGameStore.getState().state?.activeDialogue).toBe('explore');
  });
});
