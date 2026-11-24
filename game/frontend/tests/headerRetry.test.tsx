import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { getCurrentRound } from '../src/api/client';
import { HeaderOverlay } from '../src/components/HeaderOverlay';
import { useUiStore } from '../src/store/uiStore';
import { roundFixture } from './fixtures/api';

vi.mock('../src/api/client', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../src/api/client')>();
  return {
    ...actual,
    getCurrentRound: vi.fn(),
  };
});

const mockedGetCurrentRound = vi.mocked(getCurrentRound);

describe('HeaderOverlay retry and success states', () => {
  beforeEach(() => {
    useUiStore.setState(useUiStore.getInitialState(), true);
    mockedGetCurrentRound.mockReset();
  });

  afterEach(() => {
    cleanup();
  });

  it('Given the store holds a round error, when Retry is clicked and the round loads, then the header switches to the ready pill', async () => {
    // Given the round request failed and the store holds the error
    useUiStore.setState({ roundLoading: false, round: undefined, roundError: 'Round service returned 500' });
    mockedGetCurrentRound.mockResolvedValue(roundFixture);
    render(<HeaderOverlay />);
    expect(screen.getByTestId('round-pill')).toHaveAttribute('data-state', 'error');

    // When the player clicks Retry
    fireEvent.click(screen.getByRole('button', { name: 'Retry' }));

    // Then the header switches to the ready pill with the round id
    await waitFor(() => expect(screen.getByTestId('round-pill')).toHaveAttribute('data-state', 'ready'));
    expect(screen.getByText(roundFixture.id)).toBeInTheDocument();
    // And the round was requested once more
    await waitFor(() => expect(mockedGetCurrentRound).toHaveBeenCalledTimes(1));
    expect(screen.queryByRole('button', { name: 'Retry' })).toBeNull();
  });
});
