// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ApiError, listMine, submitContribution } from '../src/api/client';
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

const SUCCESS_MESSAGE = 'Suggestion sent';
const SLOW_DOWN_MESSAGE = 'Slow down, try again shortly';

function renderSheet() {
  return render(<ContributionSheet open onClose={vi.fn()} roundId="ROUND-0000001" />);
}

function typeIdea(text: string) {
  fireEvent.change(screen.getByLabelText('Your idea'), { target: { value: text } });
}

function sendIdea(text: string) {
  typeIdea(text);
  fireEvent.click(screen.getByRole('button', { name: 'Send' }));
}

describe('ContributionSheet inline feedback', () => {
  beforeEach(() => {
    submitMock.mockReset();
    // Resolve the best-effort history load so the component's effect settles cleanly.
    listMineMock.mockReset();
    listMineMock.mockResolvedValue([]);
  });

  afterEach(() => {
    cleanup();
  });

  it('Given a successful send, when the idea is submitted, then it shows the success status and no alert', async () => {
    submitMock.mockResolvedValue(contributionFixture);
    renderSheet();

    sendIdea('hello');

    expect(await screen.findByRole('status')).toHaveTextContent(SUCCESS_MESSAGE);
    expect(screen.queryByRole('alert')).toBeNull();
  });

  it('Given the server answers 429, when the idea is submitted, then it shows the slow-down alert and no status', async () => {
    submitMock.mockRejectedValue(new ApiError(429, '429 Too Many Requests'));
    renderSheet();

    sendIdea('hello');

    expect(await screen.findByRole('alert')).toHaveTextContent(SLOW_DOWN_MESSAGE);
    expect(screen.queryByRole('status')).toBeNull();
  });

  it('Given a successful send, when the player edits the idea, then the success status is cleared', async () => {
    submitMock.mockResolvedValue(contributionFixture);
    renderSheet();

    sendIdea('hello');
    await screen.findByRole('status');

    typeIdea('more');

    expect(screen.queryByRole('status')).toBeNull();
  });
});
