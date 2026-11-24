// @vitest-environment jsdom
import { act, cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import App from '../src/App';
import { phaserToReact } from '../src/phaser/events';

// In-memory stand-in for runtime/storage so the flow never touches localStorage.
let saved: unknown = null;
vi.mock('../src/runtime/storage', () => ({
  readSaved: () => saved,
  writeSaved: (state: unknown) => {
    saved = state;
    return true;
  },
}));

// Phaser is replaced at every seam: the game factory, the scene class, and the
// 'phaser' module itself (config.ts loads it at import time, which crashes in jsdom).
const { createGameMock } = vi.hoisted(() => ({
  createGameMock: vi.fn(() => ({ destroy: vi.fn(), scale: { setZoom: vi.fn(), refresh: vi.fn() } })),
}));
vi.mock('../src/phaser/createGame', () => ({ createGame: createGameMock }));
vi.mock('../src/phaser/BootScene', () => ({ BootScene: class BootScene {} }));
vi.mock('phaser', () => ({
  default: { AUTO: 0, Scale: { FIT: 3, CENTER_BOTH: 1 }, Game: class {}, Scene: class {} },
}));
// jsdom has no ResizeObserver; PhaserHost observes its container with one.
vi.stubGlobal(
  'ResizeObserver',
  class {
    observe() {}
    unobserve() {}
    disconnect() {}
  },
);

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

    act(() => phaserToReact.emit('objectClick', { id: 'bookshelf' }));

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

    act(() => phaserToReact.emit('objectClick', { id: 'bookshelf' }));
    fireEvent.click(screen.getByRole('button', { name: 'Search' }));

    expect(screen.getByRole('list', { name: 'Story history' })).toHaveTextContent(
      'A hidden door swings open behind the books.',
    );
  });

  it('choosing a dialogue option advances to the next dialogue node and records it', () => {
    begin();

    expect(screen.getByRole('region', { name: 'Dialogue' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Look around the room' }));

    // bedroom.yaml: 'look-around' is a follow-up node with a single 'Okay' choice, so the dialogue stays open.
    const dialogue = screen.getByRole('region', { name: 'Dialogue' });
    expect(within(dialogue).getByText('There is a bookshelf, a computer, a bed, a window and a door.')).toBeInTheDocument();
    expect(within(dialogue).getByRole('button', { name: 'Okay' })).toBeInTheDocument();
    expect(screen.getByRole('list', { name: 'Story history' })).toHaveTextContent(
      'Look around the room',
    );
  });
});
