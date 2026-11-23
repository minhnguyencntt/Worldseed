// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import App from '../src/App';

// In-memory stand-in for runtime/storage so the flow never touches localStorage.
let saved: unknown = null;
vi.mock('../src/runtime/storage', () => ({
  readSaved: () => saved,
  writeSaved: (state: unknown) => {
    saved = state;
    return true;
  },
}));

describe('App flow: action menu', () => {
  beforeEach(() => {
    saved = null;
  });

  afterEach(cleanup);

  function begin() {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Begin' }));
  }

  it('Given the playing view, when the Bookshelf hotspot is clicked, then the Bookshelf action menu opens with Inspect, Push, Search and Leave', () => {
    begin();

    expect(screen.queryByRole('region', { name: 'Bookshelf' })).toBeNull();

    fireEvent.click(screen.getByRole('button', { name: 'Bookshelf' }));

    const menu = screen.getByRole('region', { name: 'Bookshelf' });
    expect(menu).toHaveAttribute('data-object-id', 'bookshelf');
    expect(within(menu).getByRole('button', { name: 'Inspect' })).toBeInTheDocument();
    expect(within(menu).getByRole('button', { name: 'Push' })).toBeInTheDocument();
    expect(within(menu).getByRole('button', { name: 'Search' })).toBeInTheDocument();
    expect(within(menu).getByRole('button', { name: 'Leave' })).toBeInTheDocument();
  });
});

// The describe title carries "story" so the `-t 'story'` filter selects every test here.
describe('App flow: story actions and choices', () => {
  beforeEach(() => {
    saved = null;
  });

  afterEach(cleanup);

  function begin() {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Begin' }));
  }

  it('Search adds the hidden door text to the story history', () => {
    begin();

    fireEvent.click(screen.getByRole('button', { name: 'Bookshelf' }));
    fireEvent.click(screen.getByRole('button', { name: 'Search' }));

    expect(screen.getByRole('list', { name: 'Story history' })).toHaveTextContent(
      'A hidden door swings open behind the books.',
    );
  });

  it('choosing a dialogue option closes the dialogue and records it', () => {
    begin();

    expect(screen.getByRole('region', { name: 'Dialogue' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Look around the room' }));

    expect(screen.queryByRole('region', { name: 'Dialogue' })).toBeNull();
    expect(screen.getByRole('list', { name: 'Story history' })).toHaveTextContent(
      'Look around the room',
    );
  });
});
