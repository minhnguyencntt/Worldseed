// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { listMine, MAX_PER_PLAYER, MAX_PROMPT_LENGTH, submitContribution } from '../src/api/client';
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

// The submit button's accessible name changes to "Sending…" while in flight, so locate it through the form.
function submitButton(): HTMLButtonElement {
  const form = screen.getByLabelText('Your idea').closest('form') as HTMLFormElement;
  return form.querySelector('button[type="submit"]') as HTMLButtonElement;
}

// Backend listMine returns the player's Contribution[] for the round; a full quota is MAX_PER_PLAYER items.
function historyOf(count: number) {
  return Array.from({ length: count }, (_, i) => ({ ...contributionFixture, id: `contrib-${i + 1}` }));
}

describe('ContributionSheet Send disabled states', () => {
  beforeEach(() => {
    submitMock.mockReset();
    listMineMock.mockReset();
  });

  afterEach(() => {
    cleanup();
  });

  it('Send is disabled when the idea is blank and the player has no history', async () => {
    listMineMock.mockResolvedValue([]);
    renderSheet();

    expect(submitButton().disabled).toBe(true);
  });

  it('Send is disabled when the idea is whitespace only', async () => {
    listMineMock.mockResolvedValue([]);
    renderSheet();

    fireEvent.change(screen.getByLabelText('Your idea'), { target: { value: '   ' } });

    expect(submitButton().disabled).toBe(true);
  });

  it('Send is disabled when the idea is one character over MAX_PROMPT_LENGTH', async () => {
    listMineMock.mockResolvedValue([]);
    renderSheet();

    fireEvent.change(screen.getByLabelText('Your idea'), { target: { value: 'x'.repeat(MAX_PROMPT_LENGTH + 1) } });

    expect(submitButton().disabled).toBe(true);
  });

  it('Send is disabled at zero quota even with a valid idea', async () => {
    expect(MAX_PER_PLAYER).toBe(5);
    listMineMock.mockResolvedValue(historyOf(MAX_PER_PLAYER));
    renderSheet();
    await screen.findByText(QUOTA_MESSAGE);

    fireEvent.change(screen.getByLabelText('Your idea'), { target: { value: 'hello' } });

    expect(submitButton().disabled).toBe(true);
  });

  it('Send is disabled while a submission is in flight', async () => {
    submitMock.mockReturnValue(new Promise(() => {}));
    listMineMock.mockResolvedValue([]);
    renderSheet();

    fireEvent.change(screen.getByLabelText('Your idea'), { target: { value: 'hello' } });
    fireEvent.submit(screen.getByLabelText('Your idea').closest('form') as HTMLFormElement);

    expect(submitMock).toHaveBeenCalledTimes(1);
    expect(submitButton().disabled).toBe(true);
    expect(submitButton().getAttribute('aria-busy')).toBe('true');
  });

  it('Send is enabled for a valid idea when quota remains', async () => {
    listMineMock.mockResolvedValue([]);
    renderSheet();

    fireEvent.change(screen.getByLabelText('Your idea'), { target: { value: 'hello' } });

    expect(submitButton().disabled).toBe(false);
  });
});
