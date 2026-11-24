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

// Send is disabled for blank text, so blank submits go through the form (the Enter-key path).
function submitForm(): HTMLFormElement {
  return screen.getByRole('button', { name: 'Send' }).closest('form') as HTMLFormElement;
}

describe('ContributionSheet blank submit', () => {
  beforeEach(() => {
    submitMock.mockReset();
    listMineMock.mockReset();
    listMineMock.mockResolvedValue([contributionFixture]);
  });

  afterEach(() => {
    cleanup();
  });

  it('empty text shows "Enter an idea first" and does not submit', async () => {
    renderSheet();

    fireEvent.submit(submitForm());

    expect(screen.getByRole('alert').textContent).toBe('Enter an idea first');
    expect(submitMock).toHaveBeenCalledTimes(0);
  });

  it('whitespace-only text shows "Enter an idea first" and does not submit', async () => {
    renderSheet();

    fireEvent.change(screen.getByLabelText('Your idea'), { target: { value: '   \n  ' } });
    fireEvent.submit(submitForm());

    expect(screen.getByRole('alert').textContent).toBe('Enter an idea first');
    expect(submitMock).not.toHaveBeenCalled();
  });

  it('textarea is marked invalid and described by the alert after a blank submit', async () => {
    renderSheet();

    fireEvent.submit(submitForm());

    const alert = screen.getByRole('alert');
    const textarea = screen.getByLabelText('Your idea');
    expect(alert.id).not.toBe('');
    expect(textarea.getAttribute('aria-invalid')).toBe('true');
    expect(textarea.getAttribute('aria-describedby')).toBe(alert.id);
  });

  it('typing clears the blank message and the invalid state', async () => {
    renderSheet();

    fireEvent.submit(submitForm());
    expect(screen.getByRole('alert')).toBeTruthy();

    const textarea = screen.getByLabelText('Your idea');
    fireEvent.change(textarea, { target: { value: 'a' } });

    expect(screen.queryByRole('alert')).toBeNull();
    expect(textarea.getAttribute('aria-invalid')).not.toBe('true');
    expect(submitMock).not.toHaveBeenCalled();
  });

  it('a valid idea after a blank attempt is sent trimmed and the blank message is gone', async () => {
    submitMock.mockResolvedValue(contributionFixture);
    renderSheet();

    fireEvent.submit(submitForm());
    expect(screen.getByRole('alert').textContent).toBe('Enter an idea first');

    fireEvent.change(screen.getByLabelText('Your idea'), { target: { value: '  hello  ' } });
    fireEvent.click(screen.getByRole('button', { name: 'Send' }));

    await waitFor(() => expect(submitMock).toHaveBeenCalledTimes(1));
    expect(submitMock).toHaveBeenCalledWith('hello');
    expect(screen.queryByText('Enter an idea first')).toBeNull();
  });
});
