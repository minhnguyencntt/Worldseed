// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import App from '../src/App';
import { BootScene } from '../src/phaser/BootScene';

type FakeGame = {
  destroy: ReturnType<typeof vi.fn>;
  scale: { setZoom: ReturnType<typeof vi.fn>; refresh: ReturnType<typeof vi.fn> };
};

const { createGameMock } = vi.hoisted(() => ({ createGameMock: vi.fn() }));

vi.mock('../src/phaser/createGame', () => ({ createGame: createGameMock }));
vi.mock('../src/phaser/BootScene', () => ({ BootScene: class BootScene {} }));

// config.ts (imported by PhaserHost for computeZoom) loads Phaser at module
// load, which crashes in jsdom because there is no canvas. Stub it out.
vi.mock('phaser', () => ({
  default: {
    AUTO: 0,
    Scale: { FIT: 3, CENTER_BOTH: 1 },
    Game: class {},
    Scene: class {},
  },
}));

function makeFakeGame(): FakeGame {
  return {
    destroy: vi.fn(),
    scale: { setZoom: vi.fn(), refresh: vi.fn() },
  };
}

function fakeGameAt(index: number): FakeGame {
  return createGameMock.mock.results[index]?.value as FakeGame;
}

function begin(view: ReturnType<typeof render>) {
  fireEvent.click(view.getByRole('button', { name: 'Begin' }));
}

beforeAll(() => {
  // jsdom has no ResizeObserver; PhaserHost observes its container with it.
  vi.stubGlobal(
    'ResizeObserver',
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    },
  );
});

afterAll(() => {
  vi.unstubAllGlobals();
});

beforeEach(() => {
  createGameMock.mockReset();
  createGameMock.mockImplementation(() => makeFakeGame());
});

describe('App PhaserHost integration', () => {
  afterEach(cleanup);

  it('Given Begin is clicked, then the phaser host element renders and no image role is present', () => {
    const view = render(<App />);

    begin(view);

    expect(screen.getByTestId('phaser-host')).toBeInTheDocument();
    expect(screen.queryByRole('img')).toBeNull();
  });

  it('Given Begin is clicked, then createGame is called once with BootScene in the scene list', () => {
    const view = render(<App />);

    begin(view);

    expect(createGameMock).toHaveBeenCalledTimes(1);
    const scenes = createGameMock.mock.calls[0][1];
    expect(scenes).toContain(BootScene);
  });

  it('Given the App re-renders, then createGame is still called only once', () => {
    const view = render(<App />);
    begin(view);

    view.rerender(<App />);
    view.rerender(<App />);

    expect(createGameMock).toHaveBeenCalledTimes(1);
  });

  it('Given a started game, when the App unmounts, then the game is destroyed once with true', () => {
    const view = render(<App />);
    begin(view);
    const fake = fakeGameAt(0);

    view.unmount();

    expect(fake.destroy).toHaveBeenCalledTimes(1);
    expect(fake.destroy).toHaveBeenCalledWith(true);
  });
});
