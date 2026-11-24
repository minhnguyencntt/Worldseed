// @vitest-environment jsdom
import { renderHook, waitFor, act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { listMine, submitContribution } from '../src/api/client';
import * as contributionSheet from '../src/components/ContributionSheet';
import { ContributionSheet } from '../src/components/ContributionSheet';
import type { HistoryStatus } from '../src/components/ContributionSheet';
import { HistoryList } from '../src/components/contribution/HistoryList';
import { errorMessage as messagesErrorMessage } from '../src/components/contribution/messages';
import { useContributionHistory } from '../src/components/contribution/useContributionHistory';
import { contributionFixture } from './fixtures/api';

// Only the network-facing API calls are mocked; constants and ApiError stay real.
vi.mock('../src/api/client', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../src/api/client')>();
  return {
    ...actual,
    submitContribution: vi.fn(),
    listMine: vi.fn(),
  };
});

const submitMock = vi.mocked(submitContribution);
const listMineMock = vi.mocked(listMine);

beforeEach(() => {
  submitMock.mockReset();
  listMineMock.mockReset();
});

afterEach(() => {
  cleanup();
});

describe('HistoryList', () => {
  it('shows the loading status while history is loading', () => {
    render(<HistoryList historyStatus="loading" entries={[]} onRetry={vi.fn()} />);

    expect(screen.getByTestId('contribution-history-loading')).toHaveTextContent('Loading your suggestions…');
    expect(screen.queryByTestId('contribution-history-error')).toBeNull();
    expect(screen.queryByTestId('contribution-history-empty')).toBeNull();
  });

  it('shows the error message and a Retry button that calls onRetry when history fails', () => {
    const onRetry = vi.fn();
    render(<HistoryList historyStatus="error" entries={[]} onRetry={onRetry} />);

    expect(screen.getByTestId('contribution-history-error')).toHaveTextContent('Could not load your suggestions');
    fireEvent.click(screen.getByRole('button', { name: 'Retry' }));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('shows the empty message when history is ready with no entries', () => {
    render(<HistoryList historyStatus="ready" entries={[]} onRetry={vi.fn()} />);

    expect(screen.getByTestId('contribution-history-empty')).toHaveTextContent('No suggestions yet this round');
    expect(screen.queryByTestId('contribution-history-loading')).toBeNull();
    expect(screen.queryByRole('button', { name: 'Retry' })).toBeNull();
  });

  it('lists each entry with the Sent label', () => {
    render(
      <HistoryList
        historyStatus="ready"
        entries={[{ key: -1, prompt: 'Look behind the shelf', state: 'sent' }]}
        onRetry={vi.fn()}
      />,
    );

    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(1);
    expect(items[0]).toHaveTextContent('Look behind the shelf');
    expect(items[0]).toHaveTextContent('Sent');
    expect(screen.queryByTestId('contribution-history-empty')).toBeNull();
  });
});

describe('useContributionHistory', () => {
  it('reports loading, then ready with one history entry when listMine resolves', async () => {
    listMineMock.mockResolvedValue([contributionFixture]);

    const { result } = renderHook(() => useContributionHistory(true, 'r1'));

    expect(result.current.historyStatus).toBe<HistoryStatus>('loading');

    await waitFor(() => expect(result.current.historyStatus).toBe('ready'));
    expect(listMineMock).toHaveBeenCalledWith('r1');
    expect(result.current.entries).toHaveLength(1);
    expect(result.current.entries[0]).toMatchObject({
      prompt: 'Look behind the shelf',
      state: 'sent',
    });
  });

  it('reports error when listMine rejects, and retry() calls listMine a second time', async () => {
    listMineMock.mockRejectedValueOnce(new Error('network down'));
    listMineMock.mockResolvedValueOnce([contributionFixture]);

    const { result } = renderHook(() => useContributionHistory(true, 'r1'));

    await waitFor(() => expect(result.current.historyStatus).toBe('error'));
    expect(listMineMock).toHaveBeenCalledTimes(1);

    act(() => {
      result.current.retry();
    });

    await waitFor(() => expect(result.current.historyStatus).toBe('ready'));
    expect(listMineMock).toHaveBeenCalledTimes(2);
    expect(result.current.entries).toHaveLength(1);
  });
});

describe('ContributionSheet composed', () => {
  function renderSheet() {
    return render(<ContributionSheet open onClose={vi.fn()} roundId="r1" />);
  }

  function submitForm(): HTMLFormElement {
    return screen.getByRole('button', { name: 'Send' }).closest('form') as HTMLFormElement;
  }

  it('whitespace-only text shows "Enter an idea first" and does not submit', async () => {
    listMineMock.mockResolvedValue([]);
    renderSheet();

    fireEvent.change(screen.getByLabelText('Your idea'), { target: { value: '   ' } });
    fireEvent.submit(submitForm());

    expect(await screen.findByText('Enter an idea first')).toBeInTheDocument();
    expect(submitMock).not.toHaveBeenCalled();
  });

  it('sends the trimmed prompt and shows "Suggestion sent" on success', async () => {
    listMineMock.mockResolvedValue([]);
    submitMock.mockResolvedValue(contributionFixture);
    renderSheet();

    fireEvent.change(screen.getByLabelText('Your idea'), {
      target: { value: '  Look behind the shelf  ' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Send' }));

    expect(await screen.findByText('Suggestion sent')).toBeInTheDocument();
    expect(submitMock).toHaveBeenCalledTimes(1);
    expect(submitMock).toHaveBeenCalledWith('Look behind the shelf');
  });

  it('re-exports errorMessage and the HistoryStatus type from the messages module', () => {
    expect(contributionSheet.errorMessage).toBe(messagesErrorMessage);
    expect(contributionSheet.errorMessage(new Error('boom'))).toBe('Could not send');
  });
});
