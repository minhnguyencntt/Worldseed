// @vitest-environment jsdom
import { cleanup, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { PhaserHost } from '../src/components/PhaserHost';
import { computeZoom } from '../src/phaser/config';
import { useUiStore } from '../src/store/uiStore';

type FakeGame = {
  destroy: ReturnType<typeof vi.fn>;
  scale: { refresh: ReturnType<typeof vi.fn>; setZoom: ReturnType<typeof vi.fn> };
};

const { createGameMock, resizeCallbacks, size } = vi.hoisted(() => ({
  createGameMock: vi.fn(
    (): FakeGame => ({
      destroy: vi.fn(),
      scale: { refresh: vi.fn(), setZoom: vi.fn() },
    }),
  ),
  resizeCallbacks: [] as Array<() => void>,
  size: { width: 0, height: 0 },
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

const RECT = { left: 10, top: 20, right: 0, bottom: 0, width: 0, height: 0, x: 10, y: 20, toJSON: () => ({}) };

describe('PhaserHost publishes canvas layout to the store', () => {
  beforeEach(() => {
    resizeCallbacks.length = 0;
    createGameMock.mockClear();
    useUiStore.setState({ canvasLayout: undefined });
    size.width = 960;
    size.height = 540;
    // jsdom has no layout: the container's client size and rect are stubbed.
    Object.defineProperty(HTMLElement.prototype, 'clientWidth', {
      configurable: true,
      get: () => size.width,
    });
    Object.defineProperty(HTMLElement.prototype, 'clientHeight', {
      configurable: true,
      get: () => size.height,
    });
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue(RECT as DOMRect);
    vi.stubGlobal('ResizeObserver', FakeResizeObserver);
    vi.stubGlobal('matchMedia', vi.fn(fakeMatchMedia));
    Object.defineProperty(window, 'devicePixelRatio', { configurable: true, value: 1 });
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
    delete (HTMLElement.prototype as Partial<HTMLElement>).clientWidth;
    delete (HTMLElement.prototype as Partial<HTMLElement>).clientHeight;
    useUiStore.setState({ canvasLayout: undefined });
  });

  it('Given PhaserHost mounts, when it reports layout, then canvasLayout in the store equals the container rect with computeZoom and dpr', () => {
    render(<PhaserHost />);

    expect(useUiStore.getState().canvasLayout).toEqual({
      left: 10,
      top: 20,
      zoom: computeZoom(960, 540, 1),
      dpr: 1,
    });
  });

  it('Given PhaserHost mounts, then the game is created with the computed zoom', () => {
    render(<PhaserHost />);

    expect(createGameMock).toHaveBeenCalledTimes(1);
    expect(createGameMock.mock.calls[0][2]).toBe(computeZoom(960, 540, 1));
  });

  it('updates canvasLayout on resize: when the container size changes and the ResizeObserver callback fires, then the store zoom equals computeZoom of the new size', () => {
    render(<PhaserHost />);
    expect(useUiStore.getState().canvasLayout?.zoom).toBe(computeZoom(960, 540, 1));
    expect(resizeCallbacks).toHaveLength(1);

    size.width = 1440;
    size.height = 810;
    resizeCallbacks[0]();

    const expected = computeZoom(1440, 810, 1);
    expect(expected).not.toBe(computeZoom(960, 540, 1));
    expect(useUiStore.getState().canvasLayout).toEqual({
      left: 10,
      top: 20,
      zoom: expected,
      dpr: 1,
    });
  });

  it('updates canvasLayout on resize: when the ResizeObserver callback fires, then game.scale.setZoom is called with the new computeZoom', () => {
    render(<PhaserHost />);
    const game = createGameMock.mock.results[0].value as FakeGame;

    size.width = 1440;
    size.height = 810;
    resizeCallbacks[0]();

    expect(game.scale.setZoom).toHaveBeenCalledWith(computeZoom(1440, 810, 1));
    expect(game.scale.refresh).toHaveBeenCalled();
  });
});
