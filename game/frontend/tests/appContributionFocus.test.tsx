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
