// @vitest-environment jsdom
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import App from '../src/App';
import { roundFixture } from './fixtures/api';

vi.mock('../src/api/client', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../src/api/client')>();
  return {
    ...actual,
    getCurrentRound: vi.fn(() => Promise.resolve(roundFixture)),
  };
});

describe('App legacy header removal', () => {
  afterEach(cleanup);

  it('Given the round is loaded, then exactly one timer renders inside the header banner', async () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Begin' }));

    await screen.findByText(roundFixture.id);

    const timers = screen.getAllByRole('timer');
    expect(timers).toHaveLength(1);
    expect(screen.getByRole('banner')).toContainElement(timers[0]);
  });

  it('Given App.tsx source, then it has no RoundBadge or Countdown references', () => {
    // Vitest runs from game/frontend (see the Run step), so the path is cwd-relative.
    const source = readFileSync(resolve(process.cwd(), 'src/App.tsx'), 'utf8');

    expect(source).not.toMatch(/RoundBadge|Countdown/);
  });
});
