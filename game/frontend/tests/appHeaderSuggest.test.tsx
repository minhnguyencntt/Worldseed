// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
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

async function renderBegunApp() {
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: 'Begin' }));
  await waitFor(() => expect(mockedGetCurrentRound).toHaveBeenCalled());
  return screen.getByRole('button', { name: 'Suggest What Happens Next' });
}

describe('App header suggest button', () => {
  beforeEach(() => {
    mockedGetCurrentRound.mockReset();
    mockedListMine.mockReset();
    mockedGetCurrentRound.mockResolvedValue(roundFixture);
    mockedListMine.mockResolvedValue([]);
  });

  afterEach(cleanup);

  it('Given the game is begun, when the header renders, then exactly one Suggest button sits inside the banner', async () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Begin' }));
    await waitFor(() => expect(mockedGetCurrentRound).toHaveBeenCalled());

    const buttons = await screen.findAllByRole('button', { name: 'Suggest What Happens Next' });
    expect(buttons).toHaveLength(1);
    expect(within(screen.getByRole('banner')).getByRole('button', { name: 'Suggest What Happens Next' })).toBe(buttons[0]);
  });

  it('Given the game is begun, when the player clicks Suggest, then the contribution dialog opens', async () => {
    const trigger = await renderBegunApp();

    fireEvent.click(trigger);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('Given the contribution dialog is open, when the player presses Escape, then focus returns to the Suggest button', async () => {
    const trigger = await renderBegunApp();
    trigger.focus();
    fireEvent.click(trigger);

    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' });

    await waitFor(() => expect(document.activeElement).toBe(trigger));
  });
});
