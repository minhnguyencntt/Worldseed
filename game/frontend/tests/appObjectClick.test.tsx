// @vitest-environment jsdom
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

// PhaserHost is the only Phaser boundary mocked; the React side under test is real.
// The overlay renders only once a canvas layout is published, so the stub publishes one on mount, as the real host does.
vi.mock('../src/components/PhaserHost', async () => {
  const { useEffect } = await import('react');
  const { useUiStore } = await import('../src/store/uiStore');
  return {
    PhaserHost: () => {
      useEffect(() => {
        useUiStore.getState().setCanvasLayout({ left: 0, top: 0, zoom: 1, dpr: 1 });
      }, []);
      return null;
    },
  };
});

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

describe('App objectClick bridge', () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  function begin() {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Begin' }));
  }

  it('Given the playing view, when objectClick is emitted for bookshelf, then the Inspect, Push, Search and Leave buttons appear', () => {
    begin();

    act(() => {
      phaserToReact.emit('objectHover', { id: 'bookshelf' });
      phaserToReact.emit('objectClick', { id: 'bookshelf' });
    });

    expect(screen.getByRole('button', { name: 'Inspect Bookshelf' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Push Bookshelf' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search Bookshelf' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Leave Bookshelf' })).toBeInTheDocument();
  });

  it('Given App is unmounted, when it unsubscribes from objectClick, then the listener is released, no error is logged and no Inspect button exists', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    const realOn = phaserToReact.on.bind(phaserToReact);
    const unsubscribes: Array<ReturnType<typeof vi.fn>> = [];
    vi.spyOn(phaserToReact, 'on').mockImplementation((event, handler) => {
      const unsubscribe = vi.fn(realOn(event, handler));
      if (event === 'objectClick') {
        unsubscribes.push(unsubscribe);
      }
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
    expect(screen.queryByRole('button', { name: 'Inspect Bookshelf' })).toBeNull();
  });
});
