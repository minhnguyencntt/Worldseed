// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import App from '../src/App';
import { getCurrentRound, listMine } from '../src/api/client';
import { roundFixture } from './fixtures/api';

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

describe('App contribution focus', () => {
  beforeEach(() => {
    mockedGetCurrentRound.mockReset();
    mockedListMine.mockReset();
    mockedGetCurrentRound.mockResolvedValue(roundFixture);
    mockedListMine.mockResolvedValue([]);
  });

  afterEach(cleanup);

  it('Given the contribution sheet is open, when the player presses Escape, then focus returns to the Suggest trigger', async () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Begin' }));

    const trigger = screen.getByRole('button', { name: 'Suggest What Happens Next' });
    trigger.focus();
    fireEvent.click(trigger);

    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' });

    await waitFor(() => expect(document.activeElement).toBe(trigger));
  });

  it('Given the contribution sheet is open, when the player clicks Close, then focus returns to the Suggest trigger', async () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Begin' }));

    const trigger = screen.getByRole('button', { name: 'Suggest What Happens Next' });
    trigger.focus();
    fireEvent.click(trigger);

    fireEvent.click(screen.getByRole('button', { name: 'Close' }));

    await waitFor(() => expect(document.activeElement).toBe(trigger));
  });
});
