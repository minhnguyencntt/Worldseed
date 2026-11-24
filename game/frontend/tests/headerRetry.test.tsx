import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { HeaderOverlay } from '../src/components/HeaderOverlay';
import { roundFixture } from './fixtures/api';

describe('HeaderOverlay retry and success states', () => {
  afterEach(() => {
    cleanup();
  });

  it('calls onRetry exactly once when the Retry button is clicked in the error state', () => {
    // Given the round request failed and the header offers a retry
    const onRetry = vi.fn();
    render(
      <HeaderOverlay worldTitle="W" error="Round service returned 500" onRetry={onRetry} />,
    );

    // When the player clicks Retry
    fireEvent.click(screen.getByRole('button', { name: 'Retry' }));

    // Then the retry handler runs once
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('shows the round id, OPEN status and a timer with no Retry button when the round loads', () => {
    // Given the round loaded successfully and there is no error
    render(<HeaderOverlay worldTitle="W" round={roundFixture} />);

    // Then no Retry button is shown
    expect(screen.queryByRole('button', { name: 'Retry' })).toBeNull();
    // And the round id and OPEN status are visible
    expect(screen.getByText('round-1')).toBeInTheDocument();
    expect(screen.getByText('OPEN')).toBeInTheDocument();
    // And the countdown timer is present
    expect(screen.getByRole('timer')).toBeInTheDocument();
  });
});
