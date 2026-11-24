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
import { phaserToReact, reactToPhaser } from '../src/phaser/events';

class FakeResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

describe('App interact animation emission', () => {
  beforeEach(() => {
    vi.stubGlobal('ResizeObserver', FakeResizeObserver);
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    createGameMock.mockClear();
  });

  it('Given the bookshelf is selected, when Inspect is clicked, then playAnimation is emitted for the boy with the interact name', () => {
    const emitSpy = vi.spyOn(reactToPhaser, 'emit');

    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Begin' }));

    act(() => {
      phaserToReact.emit('objectClick', { id: 'bookshelf' });
    });
    fireEvent.click(screen.getByRole('button', { name: 'Inspect Bookshelf' }));

    expect(emitSpy).toHaveBeenCalledWith('playAnimation', { target: 'boy', name: 'interact' });
  });
});
