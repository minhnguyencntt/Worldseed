// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { listMine, MAX_PER_PLAYER, submitContribution } from '../src/api/client';
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

const QUOTA_MESSAGE = 'You have used all your suggestions this round';

function renderSheet() {
  return render(<ContributionSheet open onClose={vi.fn()} roundId="ROUND-0000001" />);
}

function sendButton(): HTMLButtonElement {
  return screen.getByRole('button', { name: 'Send' }) as HTMLButtonElement;
}

// Backend listMine returns the player's Contribution[] for the round; a full quota is MAX_PER_PLAYER items.
function historyOf(count: number) {
  return Array.from({ length: count }, (_, i) => ({ ...contributionFixture, id: `contrib-${i + 1}` }));
}

describe('ContributionSheet zero-quota gating', () => {
  beforeEach(() => {
    submitMock.mockReset();
    listMineMock.mockReset();
  });

  afterEach(() => {
    cleanup();
  });

  it('Send is disabled when the player has used all MAX_PER_PLAYER suggestions', async () => {
    expect(MAX_PER_PLAYER).toBe(5);
    listMineMock.mockResolvedValue(historyOf(5));
    renderSheet();

    await screen.findByText(QUOTA_MESSAGE);

    expect(sendButton().disabled).toBe(true);
  });

  it('submitting the form at zero quota does not call submitContribution', async () => {
    listMineMock.mockResolvedValue(historyOf(5));
    renderSheet();
    await screen.findByText(QUOTA_MESSAGE);

    fireEvent.change(screen.getByLabelText('Your idea'), { target: { value: 'hello' } });
    fireEvent.submit(screen.getByLabelText('Your idea').closest('form') as HTMLFormElement);

    expect(submitMock).not.toHaveBeenCalled();
  });

  it('Send submits the idea when one suggestion is still left', async () => {
    submitMock.mockResolvedValue(contributionFixture);
    listMineMock.mockResolvedValue(historyOf(1));
    renderSheet();
    await waitFor(() => expect(screen.getByText('Contributions left: 4')).toBeTruthy());

    fireEvent.change(screen.getByLabelText('Your idea'), { target: { value: 'hello' } });
    fireEvent.click(sendButton());

    await waitFor(() => expect(submitMock).toHaveBeenCalledTimes(1));
    expect(submitMock).toHaveBeenCalledWith('hello');
  });
});
