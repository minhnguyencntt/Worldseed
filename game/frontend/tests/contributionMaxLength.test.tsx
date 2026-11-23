// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { listMine, MAX_PROMPT_LENGTH, submitContribution } from '../src/api/client';
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

describe('ContributionSheet max length counter', () => {
  beforeEach(() => {
    submitMock.mockReset();
    listMineMock.mockReset();
    listMineMock.mockResolvedValue([contributionFixture]);
  });

  afterEach(() => {
    cleanup();
  });

  it('initial render shows "0 / 500"', () => {
    renderSheet();

    expect(screen.getByText('0 / 500')).toBeTruthy();
  });

  it('typing "hello" shows "5 / 500"', () => {
    renderSheet();

    fireEvent.change(screen.getByLabelText('Your idea'), { target: { value: 'hello' } });

    expect(screen.getByText('5 / 500')).toBeTruthy();
  });

  it('surrounding whitespace is not counted: "  hi  " shows "2 / 500"', () => {
    renderSheet();

    fireEvent.change(screen.getByLabelText('Your idea'), { target: { value: '  hi  ' } });

    expect(screen.getByText('2 / 500')).toBeTruthy();
  });

  it('textarea is described by the counter element', () => {
    renderSheet();

    const textarea = screen.getByLabelText('Your idea');
    expect(textarea.getAttribute('aria-describedby')).toContain('contribution-idea-count');
  });

  it('MAX_PROMPT_LENGTH is 500', () => {
    expect(MAX_PROMPT_LENGTH).toBe(500);
  });
});

describe('ContributionSheet over limit', () => {
  beforeEach(() => {
    submitMock.mockReset();
    listMineMock.mockReset();
    listMineMock.mockResolvedValue([contributionFixture]);
  });

  afterEach(() => {
    cleanup();
  });

  it('501 characters show "Too long: 501 / 500" and block submit', () => {
    renderSheet();
    const value = 'a'.repeat(501);

    fireEvent.change(screen.getByLabelText('Your idea'), { target: { value } });
    fireEvent.click(screen.getByRole('button', { name: 'Send' }));

    expect(screen.getByRole('alert').textContent).toBe('Too long: 501 / 500');
    expect(screen.getByLabelText('Your idea').getAttribute('aria-invalid')).toBe('true');
    expect(submitMock).not.toHaveBeenCalled();
    expect((screen.getByLabelText('Your idea') as HTMLTextAreaElement).value).toHaveLength(501);
  });

  it('500 characters show no limit message and submit the full string', async () => {
    submitMock.mockResolvedValue(contributionFixture);
    renderSheet();
    const value = 'a'.repeat(500);

    fireEvent.change(screen.getByLabelText('Your idea'), { target: { value } });
    expect(screen.queryByText(/Too long/)).toBeNull();

    fireEvent.click(screen.getByRole('button', { name: 'Send' }));

    expect(submitMock).toHaveBeenCalledTimes(1);
    expect(submitMock).toHaveBeenCalledWith(value);
  });

  it('changing from 501 to 500 characters removes the limit message', () => {
    renderSheet();

    fireEvent.change(screen.getByLabelText('Your idea'), { target: { value: 'a'.repeat(501) } });
    expect(screen.getByText('Too long: 501 / 500')).toBeTruthy();

    fireEvent.change(screen.getByLabelText('Your idea'), { target: { value: 'a'.repeat(500) } });
    expect(screen.queryByText(/Too long/)).toBeNull();
  });

  it('500 characters plus surrounding spaces still submit the trimmed 500-character string', async () => {
    submitMock.mockResolvedValue(contributionFixture);
    renderSheet();
    const core = 'a'.repeat(500);

    fireEvent.change(screen.getByLabelText('Your idea'), { target: { value: `   ${core}   ` } });
    expect(screen.queryByText(/Too long/)).toBeNull();

    fireEvent.click(screen.getByRole('button', { name: 'Send' }));

    expect(submitMock).toHaveBeenCalledTimes(1);
    expect(submitMock).toHaveBeenCalledWith(core);
  });
});
