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

describe('App objectClick bridge', () => {
  beforeEach(() => {
    vi.stubGlobal('ResizeObserver', FakeResizeObserver);
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
    createGameMock.mockClear();
  });

  function begin() {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Begin' }));
  }

  it('Given the playing view, when objectClick is emitted for bookshelf, then the Inspect, Push, Search and Leave buttons appear', () => {
    begin();

    act(() => {
      phaserToReact.emit('objectClick', { id: 'bookshelf' });
    });

    expect(screen.getByRole('button', { name: 'Inspect' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Push' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Leave' })).toBeInTheDocument();
  });

  it('Given App is unmounted, when it unsubscribes from objectClick, then the listener is released, no error is logged and no Inspect button exists', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    const realOn = phaserToReact.on.bind(phaserToReact);
    const unsubscribes: Array<ReturnType<typeof vi.fn>> = [];
    vi.spyOn(phaserToReact, 'on').mockImplementation((event, handler) => {
      const unsubscribe = vi.fn(realOn(event, handler));
      unsubscribes.push(unsubscribe);
      return unsubscribe;
    });

    const { unmount } = render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Begin' }));
    expect(unsubscribes).toHaveLength(1);
    expect(unsubscribes[0]).not.toHaveBeenCalled();

    unmount();
    expect(unsubscribes[0]).toHaveBeenCalledTimes(1);

    act(() => {
      phaserToReact.emit('objectClick', { id: 'bookshelf' });
    });

    expect(consoleError).not.toHaveBeenCalled();
    expect(screen.queryByRole('button', { name: 'Inspect' })).toBeNull();
  });
});
