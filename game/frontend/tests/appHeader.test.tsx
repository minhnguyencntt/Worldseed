// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import App from '../src/App';
import { getCurrentRound } from '../src/api/client';
import { roundFixture } from './fixtures/api';

vi.mock('../src/api/client', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../src/api/client')>();
  return {
    ...actual,
    getCurrentRound: vi.fn(),
  };
});

const mockedGetCurrentRound = vi.mocked(getCurrentRound);

describe('App header round states', () => {
  beforeEach(() => {
    mockedGetCurrentRound.mockReset();
  });

  afterEach(cleanup);

  it('Given the round request is pending, when the player begins, then the header shows the loading message', () => {
    mockedGetCurrentRound.mockReturnValue(new Promise(() => {}));

    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Begin' }));

    expect(screen.getByText('Loading round…')).toBeInTheDocument();
  });

  it('Given the round loads, when the player begins, then the header shows the round id and status', async () => {
    mockedGetCurrentRound.mockResolvedValue(roundFixture);

    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Begin' }));

    expect(await screen.findByText(roundFixture.id)).toBeInTheDocument();
    expect(screen.getByText(roundFixture.status)).toBeInTheDocument();
  });

  it('Given the round request fails, when the player begins, then the header shows an alert with the error message', async () => {
    mockedGetCurrentRound.mockRejectedValue(new Error('boom'));

    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Begin' }));

    expect(await screen.findByRole('alert')).toHaveTextContent('boom');
  });
});
