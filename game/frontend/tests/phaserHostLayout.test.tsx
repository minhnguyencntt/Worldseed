// @vitest-environment jsdom
import { cleanup, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { PhaserHost } from '../src/components/PhaserHost';

type FakeGame = {
  destroy: ReturnType<typeof vi.fn>;
  scale: { refresh: ReturnType<typeof vi.fn>; setZoom: ReturnType<typeof vi.fn> };
};

const { createGameMock, resizeCallbacks } = vi.hoisted(() => ({
  createGameMock: vi.fn(
    (): FakeGame => ({
      destroy: vi.fn(),
      scale: { refresh: vi.fn(), setZoom: vi.fn() },
    }),
  ),
  resizeCallbacks: [] as Array<() => void>,
}));

// Phaser cannot run in jsdom: replace the game factory and the Phaser module.
vi.mock('../src/phaser/createGame', () => ({ createGame: createGameMock }));
vi.mock('phaser', () => ({
  default: {
    AUTO: 0,
    Scale: { FIT: 3, CENTER_BOTH: 1 },
    Game: class {},
    Scene: class {},
  },
}));

class FakeResizeObserver {
  constructor(callback: () => void) {
    resizeCallbacks.push(callback);
  }
  observe() {}
  unobserve() {}
  disconnect() {}
}

const fakeMatchMedia = (query: string) => ({
  matches: false,
  media: query,
  onchange: null,
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  addListener: vi.fn(),
  removeListener: vi.fn(),
  dispatchEvent: vi.fn(),
});

describe('PhaserHost layout reporting', () => {
  beforeEach(() => {
    resizeCallbacks.length = 0;
    createGameMock.mockClear();
    vi.stubGlobal('ResizeObserver', FakeResizeObserver);
    vi.stubGlobal('matchMedia', vi.fn(fakeMatchMedia));
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it('Given PhaserHost mounts, when the layout is reported, then onLayout is called once with zoom at least 1 and dpr 1', () => {
    const onLayout = vi.fn();

    render(<PhaserHost onLayout={onLayout} />);

    expect(onLayout).toHaveBeenCalledTimes(1);
    const layout = onLayout.mock.calls[0][0];
    expect(layout.zoom).toBeGreaterThanOrEqual(1);
    expect(layout.dpr).toBe(1);
  });

  it('Given PhaserHost is mounted, when the captured ResizeObserver callback fires, then onLayout is called a second time', () => {
    const onLayout = vi.fn();

    render(<PhaserHost onLayout={onLayout} />);
    expect(onLayout).toHaveBeenCalledTimes(1);
    expect(resizeCallbacks).toHaveLength(1);

    resizeCallbacks[0]();

    expect(onLayout).toHaveBeenCalledTimes(2);
    expect(onLayout.mock.calls[1][0].zoom).toBeGreaterThanOrEqual(1);
  });
});
