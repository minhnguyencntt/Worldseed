import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

type FakeGame = {
  destroy: ReturnType<typeof vi.fn>;
  scale: { refresh: ReturnType<typeof vi.fn> };
};

const { fakes, createGameMock } = vi.hoisted(() => {
  const fakes: FakeGame[] = [];
  const createGameMock = vi.fn(() => {
    const fake: FakeGame = { destroy: vi.fn(), scale: { refresh: vi.fn() } };
    fakes.push(fake);
    return fake;
  });
  return { fakes, createGameMock };
});

vi.mock('../src/phaser/createGame', () => ({ createGame: createGameMock }));

import { PhaserHost } from '../src/components/PhaserHost';

let resizeCallbacks: Array<() => void> = [];
const disconnectSpy = vi.fn();

class FakeResizeObserver {
  constructor(callback: () => void) {
    resizeCallbacks.push(callback);
  }
  observe() {}
  unobserve() {}
  disconnect() {
    disconnectSpy();
  }
}

describe('PhaserHost lifecycle', () => {
  beforeEach(() => {
    vi.stubGlobal('ResizeObserver', FakeResizeObserver);
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
    fakes.length = 0;
    createGameMock.mockClear();
    disconnectSpy.mockClear();
    resizeCallbacks = [];
  });

  it('keeps a single live game when StrictMode double-invokes the mount effect', () => {
    render(
      <React.StrictMode>
        <PhaserHost />
      </React.StrictMode>,
    );

    expect(fakes).toHaveLength(2);
    expect(fakes[0].destroy).toHaveBeenCalledWith(true);
    expect(fakes[fakes.length - 1].destroy).not.toHaveBeenCalled();
  });

  it('destroys the game exactly once when the host unmounts', () => {
    const { unmount } = render(<PhaserHost />);

    expect(fakes).toHaveLength(1);
    expect(fakes[0].destroy).not.toHaveBeenCalled();

    unmount();

    expect(fakes[0].destroy).toHaveBeenCalledTimes(1);
    expect(fakes[0].destroy).toHaveBeenCalledWith(true);
    expect(disconnectSpy).toHaveBeenCalled();
  });

  it('refreshes the Phaser scale when the container is resized', () => {
    render(<PhaserHost />);

    expect(resizeCallbacks).toHaveLength(1);
    resizeCallbacks[0]();

    expect(fakes[0].scale.refresh).toHaveBeenCalledTimes(1);
  });
});
