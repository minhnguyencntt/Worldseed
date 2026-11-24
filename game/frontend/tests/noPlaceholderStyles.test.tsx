// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ContributionSheet } from '../src/components/ContributionSheet';

// Replaces the global fetch so the sheet's history load never touches the network.
function stubFetchEmptyHistory() {
  vi.stubGlobal(
    'fetch',
    vi.fn(async () => new Response(JSON.stringify([]), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })),
  );
}

describe('ContributionSheet dialog styling', () => {
  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it('Given an open contribution dialog, when rendered, then the dialog uses the kit parchment frame class and not the removed contribution-sheet placeholder class', () => {
    stubFetchEmptyHistory();
    render(<ContributionSheet open onClose={vi.fn()} roundId="round-1" />);

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveClass('sf-frame-parchment');
    expect(dialog).not.toHaveClass('contribution-sheet');
  });
});
