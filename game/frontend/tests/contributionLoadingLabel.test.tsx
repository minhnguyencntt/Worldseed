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

function renderSheet() {
  return render(<ContributionSheet open onClose={vi.fn()} roundId="ROUND-0000001" />);
}

function sendingButton(): HTMLButtonElement {
  return screen.getByRole('button', { name: 'Sending…' }) as HTMLButtonElement;
}

describe('ContributionSheet loading label', () => {
  beforeEach(() => {
    submitMock.mockReset();
    listMineMock.mockReset();
    // History is best-effort; an empty list keeps the quota at full so Send is enabled.
    listMineMock.mockResolvedValue([]);
  });

  afterEach(() => {
    cleanup();
  });

  it('shows the Sending… label with aria-busy while the submit is in flight, then returns to Send on success', async () => {
    let resolveSubmit: (value: typeof contributionFixture) => void = () => {};
    submitMock.mockReturnValue(
      new Promise((resolve) => {
        resolveSubmit = resolve;
      }),
    );
    renderSheet();

    fireEvent.change(screen.getByLabelText('Your idea'), { target: { value: 'hello' } });
    fireEvent.submit(screen.getByLabelText('Your idea').closest('form') as HTMLFormElement);

    expect(sendingButton().getAttribute('aria-busy')).toBe('true');

    resolveSubmit(contributionFixture);

    await waitFor(() => expect(screen.getByRole('button', { name: 'Send' })).toBeTruthy());
    expect(submitMock).toHaveBeenCalledWith('hello');
  });

  it('returns the button label to Send when the submit is rejected', async () => {
    submitMock.mockRejectedValue(new Error('x'));
    renderSheet();

    fireEvent.change(screen.getByLabelText('Your idea'), { target: { value: 'hello' } });
    fireEvent.submit(screen.getByLabelText('Your idea').closest('form') as HTMLFormElement);

    await waitFor(() => expect(screen.getByRole('button', { name: 'Send' })).toBeTruthy());
    expect(screen.queryByRole('button', { name: 'Sending…' })).toBeNull();
  });
});
