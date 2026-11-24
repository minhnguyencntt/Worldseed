// @vitest-environment jsdom
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import App from '../src/App';
import { phaserToReact } from '../src/phaser/events';
import { useUiStore } from '../src/store/uiStore';

// The real App is rendered with its real components. localStorage is jsdom's
// and is cleared between tests by tests/setup.ts.
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

describe('App intro gate', () => {
  afterEach(cleanup);

  it('Given a fresh render, then the intro and Begin button show and no hotspot exists', () => {
    render(<App />);

    expect(screen.getByText('What should I do?')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Begin' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Bed' })).toBeNull();
  });

  it('Given Begin is clicked, then the intro is removed', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: 'Begin' }));

    expect(screen.queryByText('What should I do?')).toBeNull();
  });
});

describe('App playing view', () => {
  beforeEach(() => {
    useUiStore.setState(useUiStore.getInitialState(), true);
    useUiStore.getState().setCanvasLayout({ left: 0, top: 0, zoom: 1, dpr: 1 });
  });
  afterEach(cleanup);

  function begin() {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Begin' }));
  }

  it('Given Begin clicked, then the Phaser host and opening dialogue render', () => {
    begin();

    expect(screen.getByTestId('phaser-host')).toBeInTheDocument();
    expect(
      screen.getByText("I don't know what to do next. What should we do?"),
    ).toBeInTheDocument();
  });

  it('Given the game view, when Bookshelf is clicked, then Inspect, Push, Search and Leave buttons appear', () => {
    begin();

    act(() => phaserToReact.emit('objectClick', { id: 'bookshelf' }));

    expect(screen.getByRole('button', { name: 'Inspect Bookshelf' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Push Bookshelf' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search Bookshelf' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Leave Bookshelf' })).toBeInTheDocument();
  });

  it('Given Bookshelf menu, when Search is clicked, then history shows the hidden door text', () => {
    begin();

    act(() => phaserToReact.emit('objectClick', { id: 'bookshelf' }));
    fireEvent.click(screen.getByRole('button', { name: 'Search Bookshelf' }));

    expect(screen.getByText('A hidden door swings open behind the books.')).toBeInTheDocument();
  });

  it('Given the opening dialogue, when Look around the room is clicked, then dialogue closes and history keeps the choice', () => {
    begin();

    fireEvent.click(screen.getByRole('button', { name: 'Look around the room' }));

    expect(screen.queryByRole('button', { name: 'Look around the room' })).toBeNull();
    expect(screen.getByRole('list', { name: 'Story history' })).toHaveTextContent(
      'Look around the room',
    );
  });
});

describe('App remount and saved state', () => {
  beforeEach(() => {
    useUiStore.setState(useUiStore.getInitialState(), true);
    useUiStore.getState().setCanvasLayout({ left: 0, top: 0, zoom: 1, dpr: 1 });
  });
  afterEach(cleanup);

  function begin() {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Begin' }));
  }

  it('Given a played game is unmounted, when the App remounts and Begin is clicked, then history and the Inventory region are restored', () => {
    const first = render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Begin' }));
    act(() => phaserToReact.emit('objectClick', { id: 'bookshelf' }));
    fireEvent.click(screen.getByRole('button', { name: 'Search Bookshelf' }));

    first.unmount();
    begin();

    expect(screen.getByRole('list', { name: 'Story history' })).toHaveTextContent(
      'A hidden door swings open behind the books.',
    );
    expect(screen.getByRole('region', { name: 'Inventory' })).toBeInTheDocument();
  });

  it('Given no saved state, when Begin is clicked, then the game starts fresh at the opening dialogue with no story history', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);

    begin();

    expect(screen.getByRole('region', { name: 'Dialogue' })).toHaveTextContent(
      "I don't know what to do next. What should we do?",
    );
  });
});
