// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react';
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

const QUOTA_MESSAGE = 'You have used all your suggestions this round';

function renderSheet() {
  return render(<ContributionSheet open onClose={vi.fn()} roundId="ROUND-0000001" />);
}

describe('ContributionSheet zero-quota message', () => {
  beforeEach(() => {
    submitMock.mockReset();
    listMineMock.mockReset();
  });

  afterEach(() => {
    cleanup();
  });

  it('shows the message when 5 sent contributions exist', async () => {
    const fiveSent = Array.from({ length: 5 }, (_, i) => ({
      ...contributionFixture,
      id: `contrib-${i + 1}`,
      prompt: `Idea ${i + 1}`,
    }));
    listMineMock.mockResolvedValue(fiveSent);

    renderSheet();

    expect(await screen.findByText(QUOTA_MESSAGE)).toBeTruthy();
    expect(listMineMock).toHaveBeenCalledWith('ROUND-0000001');
  });

  it('omits the message with 1 sent contribution', async () => {
    listMineMock.mockResolvedValue([contributionFixture]);

    renderSheet();

    // Wait for the history list to render before asserting the message is absent.
    expect(await screen.findByText(contributionFixture.prompt)).toBeTruthy();
    expect(screen.queryByText(QUOTA_MESSAGE)).toBeNull();
  });
});
