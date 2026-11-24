// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import App from '../src/App';
import { GameScreen } from '../src/components/GameScreen';
import { getCurrentRound, listMine } from '../src/api/client';
import { roundFixture } from './fixtures/api';
import { useUiStore } from '../src/store/uiStore';

// The API client and Phaser are the only mocked seams. Everything else in the
// App gate and GameScreen composition renders for real.
vi.mock('../src/api/client', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../src/api/client')>();
  return {
    ...actual,
    getCurrentRound: vi.fn(),
    listMine: vi.fn(),
  };
});

const mockedGetCurrentRound = vi.mocked(getCurrentRound);
const mockedListMine = vi.mocked(listMine);

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

describe('App to GameScreen composition', () => {
  beforeEach(() => {
    useUiStore.setState(useUiStore.getInitialState(), true);
    mockedGetCurrentRound.mockReset();
    mockedListMine.mockReset();
    mockedGetCurrentRound.mockResolvedValue(roundFixture);
    mockedListMine.mockResolvedValue([]);
    createGameMock.mockClear();
  });

  afterEach(cleanup);

  it('shows the intro then GameScreen after Begin', async () => {
    render(<App />);

    expect(screen.getByRole('button', { name: 'Begin' })).toBeInTheDocument();
    expect(mockedGetCurrentRound).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole('button', { name: 'Begin' }));

    expect(createGameMock).toHaveBeenCalled();
    expect(screen.getByRole('button', { name: 'Suggest What Happens Next' })).toBeInTheDocument();
    expect(screen.getByLabelText('Dialogue')).toBeInTheDocument();
    expect(await screen.findByText('round-1')).toBeInTheDocument();
  });
});

describe('GameScreen contribution sheet focus', () => {
  beforeEach(() => {
    useUiStore.setState(useUiStore.getInitialState(), true);
    mockedGetCurrentRound.mockReset();
    mockedListMine.mockReset();
    mockedListMine.mockResolvedValue([]);
    createGameMock.mockClear();
  });

  afterEach(cleanup);

  it('Suggest opens the sheet and returns focus', async () => {
    useUiStore.setState({ round: roundFixture, roundLoading: false, roundError: undefined });
    render(<GameScreen />);

    const trigger = screen.getByRole('button', { name: 'Suggest What Happens Next' });
    trigger.focus();
    fireEvent.click(trigger);

    expect(await screen.findByRole('dialog', { name: 'Suggest What Happens Next' })).toBeInTheDocument();

    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' });

    await waitFor(() => expect(document.activeElement).toBe(trigger));
  });
});
