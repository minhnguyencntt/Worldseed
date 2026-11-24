// @vitest-environment jsdom
import { cleanup, render, screen, waitFor } from '@testing-library/react';
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

function renderSheet() {
  return render(<ContributionSheet open onClose={vi.fn()} roundId="round-1" />);
}

describe('history status', () => {
  beforeEach(() => {
    submitMock.mockReset();
    listMineMock.mockReset();
  });

  afterEach(() => {
    cleanup();
  });

  it('shows loading while listMine is pending', () => {
    listMineMock.mockReturnValue(new Promise(() => {}));

    renderSheet();

    expect(screen.getByText(HISTORY_LOADING)).toBeTruthy();
  });

  it('hides loading and lists entries on success', async () => {
    listMineMock.mockResolvedValue([contributionFixture]);

    renderSheet();

    expect(await screen.findByText(contributionFixture.prompt)).toBeTruthy();
    await waitFor(() => expect(screen.queryByText(HISTORY_LOADING)).toBeNull());
  });

  it('shows error alert when listMine rejects', async () => {
    listMineMock.mockRejectedValue(new Error('network down'));

    renderSheet();

    expect(await screen.findByRole('alert')).toHaveTextContent(HISTORY_ERROR);
    expect(screen.queryByText(HISTORY_LOADING)).toBeNull();
  });

  it('shows the loading test id while history is pending', () => {
    listMineMock.mockReturnValue(new Promise(() => {}));

    renderSheet();

    expect(screen.getByTestId('contribution-history-loading')).toHaveTextContent(HISTORY_LOADING);
    expect(screen.queryByTestId('contribution-success')).toBeNull();
  });
});
