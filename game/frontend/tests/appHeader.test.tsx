// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import App from '../src/App';
import { getCurrentRound } from '../src/api/client';
import { roundFixture } from './fixtures/api';
import { useUiStore } from '../src/store/uiStore';

vi.mock('../src/api/client', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../src/api/client')>();
  return {
    ...actual,
    getCurrentRound: vi.fn(),
  };
});

const mockedGetCurrentRound = vi.mocked(getCurrentRound);

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

describe('App header round states', () => {
  beforeEach(() => {
    useUiStore.setState(useUiStore.getInitialState(), true);
    mockedGetCurrentRound.mockReset();
  });

  afterEach(cleanup);

  it('Given the round request is pending, when the player begins, then the header shows the loading message', () => {
    mockedGetCurrentRound.mockReturnValue(new Promise(() => {}));

    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Begin' }));

    expect(screen.getByText('Loading round…')).toBeInTheDocument();
  });

  it('Given the round loads, when the player begins, then the header shows the round id and status', async () => {
    mockedGetCurrentRound.mockResolvedValue(roundFixture);

    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Begin' }));

    expect(await screen.findByText(roundFixture.id)).toBeInTheDocument();
    expect(screen.getByText(roundFixture.status)).toBeInTheDocument();
  });

  it('Given the round request fails, when the player begins, then the header shows an alert with the error message', async () => {
    mockedGetCurrentRound.mockRejectedValue(new Error('boom'));

    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Begin' }));

    expect(await screen.findByRole('alert')).toHaveTextContent('boom');
  });
});
