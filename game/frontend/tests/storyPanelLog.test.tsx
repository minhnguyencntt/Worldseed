// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { StoryPanel } from '../src/components/StoryPanel';
import { useGameStore } from '../src/store/gameStore';

// Seeds the shared game store with the given history and renders StoryPanel from it.
function renderWithHistory(history: string[]) {
  useGameStore.getState().hydrate();
  useGameStore.getState().setState((prev) => ({ ...prev, history }));
  render(<StoryPanel />);
}

describe('StoryPanel event log', () => {
  afterEach(() => {
    cleanup();
  });

  it('lists the history lines in order inside the Event log region', () => {
    // Given the store's history is ['a', 'b'],
    // when StoryPanel renders,
    // then the Event log region contains a Story history list whose items read a, then b.
    renderWithHistory(['a', 'b']);

    const log = screen.getByRole('region', { name: 'Event log' });
    const history = within(log).getByRole('list', { name: 'Story history' });
    const items = within(history).getAllByRole('listitem');
    expect(items.map((item) => item.textContent)).toEqual(['a', 'b']);
  });

  it('shows the empty message and no Story history list when history is empty', () => {
    // Given the store's history is [],
    // when StoryPanel renders,
    // then the Event log region shows 'Nothing has happened yet' and no Story history list exists.
    renderWithHistory([]);

    const log = screen.getByRole('region', { name: 'Event log' });
    expect(within(log).getByText('Nothing has happened yet')).toBeInTheDocument();
    expect(screen.queryByRole('list', { name: 'Story history' })).toBeNull();
  });
});
