// @vitest-environment jsdom
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { listMine } from '../src/api/client';
import { ContributionSheet } from '../src/components/ContributionSheet';
import { contributionFixture } from './fixtures/api';

vi.mock('../src/api/client', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../src/api/client')>();
  return {
    ...actual,
    submitContribution: vi.fn(),
    listMine: vi.fn(),
  };
});

const listMineMock = vi.mocked(listMine);

const HISTORY_ERROR = 'Could not load your suggestions';
const HISTORY_LOADING = 'Loading your suggestions…';

describe('history retry', () => {
  beforeEach(() => {
    listMineMock.mockReset();
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it('Retry reloads and recovers', async () => {
    listMineMock.mockRejectedValueOnce(new Error('network down'));
    listMineMock.mockResolvedValueOnce([contributionFixture]);

    render(<ContributionSheet open onClose={vi.fn()} roundId="round-1" />);

    expect(await screen.findByRole('alert')).toHaveTextContent(HISTORY_ERROR);

    await userEvent.click(screen.getByRole('button', { name: 'Retry' }));

    await waitFor(() => {
      expect(listMineMock).toHaveBeenCalledTimes(2);
    });
    expect(await screen.findByText(contributionFixture.prompt)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Retry' })).toBeNull();
  });

  it('no Retry when ready', async () => {
    listMineMock.mockResolvedValueOnce([]);

    render(<ContributionSheet open onClose={vi.fn()} roundId="round-1" />);

    await waitFor(() => {
      expect(listMineMock).toHaveBeenCalledTimes(1);
    });
    await waitFor(() => {
      expect(screen.queryByText(HISTORY_LOADING)).toBeNull();
    });
    expect(screen.queryByText(HISTORY_ERROR)).toBeNull();
    expect(screen.queryByRole('button', { name: 'Retry' })).toBeNull();
  });

  it('error shows the error test id and Retry, and Retry returns to loading', async () => {
    listMineMock.mockRejectedValueOnce(new Error('network down'));
    // Second request never settles so the sheet stays in the loading state.
    listMineMock.mockReturnValueOnce(new Promise<never>(() => {}));

    render(<ContributionSheet open onClose={vi.fn()} roundId="round-1" />);

    expect(await screen.findByTestId('contribution-history-error')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Retry' })).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'Retry' }));

    expect(await screen.findByTestId('contribution-history-loading')).toBeInTheDocument();
    expect(listMineMock).toHaveBeenCalledTimes(2);
  });
});
