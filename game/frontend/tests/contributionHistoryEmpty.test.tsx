// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { listMine, submitContribution } from '../src/api/client';
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

const submitMock = vi.mocked(submitContribution);
const listMineMock = vi.mocked(listMine);

const HISTORY_LOADING = 'Loading your suggestions…';
const HISTORY_ERROR = 'Could not load your suggestions';
const HISTORY_EMPTY = 'No suggestions yet this round';

function renderSheet() {
  return render(<ContributionSheet open onClose={vi.fn()} roundId="round-1" />);
}

describe('history empty state', () => {
  beforeEach(() => {
    submitMock.mockReset();
    listMineMock.mockReset();
  });

  afterEach(() => {
    cleanup();
  });

  it('shows the empty message when history loads empty', async () => {
    listMineMock.mockResolvedValue([]);

    renderSheet();

    expect(await screen.findByText(HISTORY_EMPTY)).toBeTruthy();
  });

  it('hides the empty message after an entry is added', async () => {
    listMineMock.mockResolvedValue([]);
    const newIdea = { ...contributionFixture, prompt: 'A new idea' };
    submitMock.mockResolvedValue(newIdea);

    renderSheet();
    await screen.findByText(HISTORY_EMPTY);

    fireEvent.change(screen.getByRole('textbox', { name: 'Your idea' }), {
      target: { value: 'A new idea' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Send' }));

    await waitFor(() => expect(screen.queryByText(HISTORY_EMPTY)).toBeNull());
    expect(screen.getByText('A new idea')).toBeTruthy();
  });

  it('does not show the empty message while loading', () => {
    listMineMock.mockReturnValue(new Promise(() => {}));

    renderSheet();

    expect(screen.getByText(HISTORY_LOADING)).toBeTruthy();
    expect(screen.queryByText(HISTORY_EMPTY)).toBeNull();
  });

  it('does not show the empty message on error', async () => {
    listMineMock.mockRejectedValue(new Error('network down'));

    renderSheet();

    expect(await screen.findByText(HISTORY_ERROR)).toBeTruthy();
    expect(screen.queryByText(HISTORY_EMPTY)).toBeNull();
  });

  it('does not show the empty message when history has entries', async () => {
    listMineMock.mockResolvedValue([contributionFixture]);

    renderSheet();

    expect(await screen.findByText(contributionFixture.prompt)).toBeTruthy();
    expect(screen.queryByText(HISTORY_EMPTY)).toBeNull();
  });

  it('shows the empty test id when history loads empty', async () => {
    listMineMock.mockResolvedValue([]);

    renderSheet();

    expect(await screen.findByTestId('contribution-history-empty')).toBeTruthy();
    expect(screen.queryByTestId('contribution-history-loading')).toBeNull();
  });
});
