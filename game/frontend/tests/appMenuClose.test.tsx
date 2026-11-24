// @vitest-environment jsdom
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

// Phaser cannot run in jsdom, so the Phaser host, the boot scene and the
// Phaser module are replaced with inert fakes. The React side is real.
type FakeGame = {
  destroy: ReturnType<typeof vi.fn>;
  scale: { refresh: ReturnType<typeof vi.fn>; setZoom: ReturnType<typeof vi.fn> };
};

const { createGameMock } = vi.hoisted(() => {
  const createGameMock = vi.fn((): FakeGame => ({
    destroy: vi.fn(),
    scale: { refresh: vi.fn(), setZoom: vi.fn() },
  }));
  return { createGameMock };
});

vi.mock('../src/phaser/createGame', () => ({ createGame: createGameMock }));

vi.mock('../src/phaser/BootScene', () => ({ BootScene: class {} }));

vi.mock('phaser', () => ({
  default: {
    AUTO: 0,
    Scale: { FIT: 3, CENTER_BOTH: 1 },
    Game: class {},
    Scene: class {},
  },
}));

import App from '../src/App';
import { phaserToReact } from '../src/phaser/events';

class FakeResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

describe('App menuClose', () => {
  beforeEach(() => {
    vi.stubGlobal('ResizeObserver', FakeResizeObserver);
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    createGameMock.mockClear();
  });

  function begin() {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Begin' }));
  }

  it('Given an object is selected, when menuClose is emitted, then the ActionMenu closes and its buttons disappear', () => {
    begin();

    act(() => {
      phaserToReact.emit('objectClick', { id: 'bookshelf' });
    });
    expect(screen.getByRole('button', { name: 'Inspect Bookshelf' })).toBeInTheDocument();

    act(() => {
      phaserToReact.emit('menuClose', {});
    });

    expect(screen.queryByRole('button', { name: 'Inspect Bookshelf' })).toBeNull();
    expect(screen.queryByRole('button', { name: 'Push Bookshelf' })).toBeNull();
    expect(screen.queryByRole('button', { name: 'Search Bookshelf' })).toBeNull();
    expect(screen.queryByRole('button', { name: 'Leave Bookshelf' })).toBeNull();
  });

  it('Given App is unmounted, when it unsubscribes from menuClose, then the menuClose listener is released and no error is logged', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    const realOn = phaserToReact.on.bind(phaserToReact);
    const menuCloseUnsubscribes: Array<ReturnType<typeof vi.fn>> = [];
    vi.spyOn(phaserToReact, 'on').mockImplementation((event, handler) => {
      const unsubscribe = vi.fn(realOn(event, handler));
      if (event === 'menuClose') {
        menuCloseUnsubscribes.push(unsubscribe);
      }
      return unsubscribe;
    });

    const { unmount } = render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Begin' }));
    expect(menuCloseUnsubscribes).toHaveLength(1);
    expect(menuCloseUnsubscribes[0]).not.toHaveBeenCalled();

    unmount();
    expect(menuCloseUnsubscribes[0]).toHaveBeenCalledTimes(1);

    act(() => {
      phaserToReact.emit('menuClose', {});
    });

    expect(consoleError).not.toHaveBeenCalled();
  });
});
