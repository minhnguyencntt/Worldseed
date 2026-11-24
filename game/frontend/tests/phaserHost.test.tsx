import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

type FakeGame = {
  destroy: ReturnType<typeof vi.fn>;
  scale: { refresh: ReturnType<typeof vi.fn>; setZoom: ReturnType<typeof vi.fn> };
};

const { fakes, createGameMock } = vi.hoisted(() => {
  const fakes: FakeGame[] = [];
  const createGameMock = vi.fn(() => {
    const fake: FakeGame = {
      destroy: vi.fn(),
      scale: { refresh: vi.fn(), setZoom: vi.fn() },
    };
    fakes.push(fake);
    return fake;
  });
  return { fakes, createGameMock };
});

vi.mock('../src/phaser/createGame', () => ({ createGame: createGameMock }));

// config.ts imports Phaser at module load; jsdom has no canvas, so stub it.
vi.mock('phaser', () => ({
  default: {
    AUTO: 0,
    Scale: { FIT: 3, CENTER_BOTH: 1 },
    Game: class {},
    Scene: class {},
  },
}));

import { PhaserHost } from '../src/components/PhaserHost';
import { computeZoom } from '../src/phaser/config';

function stubViewport(width: number, height: number, dpr: number) {
  Object.defineProperty(HTMLElement.prototype, 'clientWidth', {
    configurable: true,
    get: () => width,
  });
  Object.defineProperty(HTMLElement.prototype, 'clientHeight', {
    configurable: true,
    get: () => height,
  });
  Object.defineProperty(window, 'devicePixelRatio', { configurable: true, value: dpr });
}

function restoreViewport(
  saved: Array<[object, string, PropertyDescriptor | undefined]>,
) {
  for (const [target, key, descriptor] of saved) {
    if (descriptor) Object.defineProperty(target, key, descriptor);
    else delete (target as Record<string, unknown>)[key];
  }
}

function saveViewport() {
  return [
    [HTMLElement.prototype, 'clientWidth', Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'clientWidth')],
    [HTMLElement.prototype, 'clientHeight', Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'clientHeight')],
    [window, 'devicePixelRatio', Object.getOwnPropertyDescriptor(window, 'devicePixelRatio')],
  ] as Array<[object, string, PropertyDescriptor | undefined]>;
}

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

  it('passes computeZoom(container size, dpr) to createGame', () => {
    const saved = saveViewport();
    try {
      stubViewport(1280, 720, 2);

      render(<PhaserHost />);

      expect(createGameMock).toHaveBeenCalledTimes(1);
      expect(createGameMock.mock.calls[0][2]).toBe(computeZoom(1280, 720, 2));
    } finally {
      restoreViewport(saved);
    }
  });

  it('recomputes zoom and refreshes on resize and dpr change', () => {
    const saved = saveViewport();
    const listeners: Array<() => void> = [];
    const removeEventListener = vi.fn();
    const matchMediaSpy = vi.fn(() => ({
      addEventListener: (_type: string, listener: () => void) => listeners.push(listener),
      removeEventListener,
    }));
    try {
      stubViewport(1280, 720, 2);
      const first = render(<PhaserHost />);

      stubViewport(640, 720, 1);
      resizeCallbacks[0]();

      expect(fakes[0].scale.setZoom).toHaveBeenCalledWith(computeZoom(640, 720, 1));
      expect(fakes[0].scale.refresh).toHaveBeenCalled();

      // Re-render with matchMedia available so the dpr listener gets armed.
      first.unmount();
      vi.stubGlobal('matchMedia', matchMediaSpy);
      render(<PhaserHost />);
      expect(listeners).toHaveLength(1);

      listeners[0]();

      expect(fakes[1].scale.setZoom).toHaveBeenCalledWith(computeZoom(640, 720, 1));
      expect(fakes[1].scale.refresh).toHaveBeenCalled();

      cleanup();
      expect(removeEventListener).toHaveBeenCalled();
    } finally {
      vi.unstubAllGlobals();
      restoreViewport(saved);
    }
  });
});
