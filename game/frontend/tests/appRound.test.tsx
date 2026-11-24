// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import App, { describeRoundError } from '../src/App';
import { ApiError, getCurrentRound } from '../src/api/client';
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

describe('App round states', () => {
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

  it('Given the round loads, when the player begins, then the header shows the round id and OPEN status', async () => {
    mockedGetCurrentRound.mockResolvedValue(roundFixture);

    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Begin' }));

    expect(await screen.findByText('round-1')).toBeInTheDocument();
    expect(screen.getByText('OPEN')).toBeInTheDocument();
  });

  it('Given the server answers 404, when the player begins, then the header shows "No active round" and no alert', async () => {
    mockedGetCurrentRound.mockRejectedValue(new ApiError(404, '404 Not Found'));

    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Begin' }));

    expect(await screen.findByText('No active round')).toBeInTheDocument();
    expect(screen.queryByRole('alert')).toBeNull();
  });

  it('Given the server answers 500, when the player begins, then an alert reports the round service status', async () => {
    mockedGetCurrentRound.mockRejectedValue(new ApiError(500, '500 x'));

    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Begin' }));

    expect(await screen.findByRole('alert')).toHaveTextContent('Round service returned 500');
  });

  it('Given the server cannot be reached, when the player begins, then an alert says the server could not be reached', async () => {
    mockedGetCurrentRound.mockRejectedValue(new TypeError('Failed to fetch'));

    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Begin' }));

    expect(await screen.findByRole('alert')).toHaveTextContent('Could not reach the server');
  });

  it('Given the round response is not JSON, when the player begins, then the header shows the explained message and no parser text', async () => {
    mockedGetCurrentRound.mockRejectedValue(new SyntaxError('Unexpected token <'));

    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Begin' }));

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Round service returned an unexpected response (not JSON)',
    );
    expect(screen.queryByText(/Unexpected token/)).toBeNull();
  });

  it('Given the first request failed, when the player clicks Retry and the next request succeeds, then the round appears and the round was requested twice', async () => {
    mockedGetCurrentRound
      .mockRejectedValueOnce(new ApiError(500, '500 x'))
      .mockResolvedValueOnce(roundFixture);

    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Begin' }));

    await screen.findByRole('alert');
    fireEvent.click(screen.getByRole('button', { name: 'Retry' }));

    expect(await screen.findByText('round-1')).toBeInTheDocument();
    await waitFor(() => expect(mockedGetCurrentRound).toHaveBeenCalledTimes(2));
    expect(screen.queryByRole('alert')).toBeNull();
  });
});

describe('describeRoundError', () => {
  it('Given an ApiError with a server detail, then the message includes the status and the detail', () => {
    expect(describeRoundError(new ApiError(500, '500 x', 'database down'))).toBe(
      'Round service returned 500: database down',
    );
  });

  it('Given an ApiError without a server detail, then the message contains only the status', () => {
    expect(describeRoundError(new ApiError(503, '503 x'))).toBe('Round service returned 503');
  });

  it('Given a TypeError, then the message says the server could not be reached', () => {
    expect(describeRoundError(new TypeError('Failed to fetch'))).toBe('Could not reach the server');
  });

  it('Given a plain string, then the message is the generic round request failure', () => {
    expect(describeRoundError('oops')).toBe('Round request failed');
  });

  it('Given a SyntaxError from parsing a non-JSON body, then the message says the round service returned an unexpected response', () => {
    expect(describeRoundError(new SyntaxError("Unexpected token '<'"))).toBe(
      'Round service returned an unexpected response (not JSON)',
    );
  });
});
