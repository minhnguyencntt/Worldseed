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
