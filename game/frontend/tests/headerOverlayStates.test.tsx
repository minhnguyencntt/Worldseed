import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { HeaderOverlay } from '../src/components/HeaderOverlay';
import { roundFixture } from './fixtures/api';

describe('HeaderOverlay states', () => {
  afterEach(() => {
    cleanup();
  });

  it('shows a loading message and no timer while the round is loading', () => {
    // Given the round is still loading
    render(<HeaderOverlay worldTitle="W" loading />);

    // Then the header shows the loading message and no timer
    expect(screen.getByText('Loading round…')).toBeInTheDocument();
    expect(screen.queryByRole('timer')).toBeNull();
  });

  it('shows an actionable alert and no timer when the round fails to load', () => {
    // Given the round request failed with a service error
    render(<HeaderOverlay worldTitle="W" round={roundFixture} error="Round service returned 500" />);

    // Then an alert explains the failure and no timer is shown
    expect(screen.getByRole('alert')).toHaveTextContent('Round unavailable: Round service returned 500');
    expect(screen.queryByRole('timer')).toBeNull();
  });

  it('shows a no-active-round message when there is no round', () => {
    // Given the world has no round
    render(<HeaderOverlay worldTitle="W" />);

    // Then the header says there is no active round
    expect(screen.getByText('No active round')).toBeInTheDocument();
  });
});
