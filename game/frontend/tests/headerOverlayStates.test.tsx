import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { HeaderOverlay } from '../src/components/HeaderOverlay';
import { useUiStore } from '../src/store/uiStore';
import { roundFixture } from './fixtures/api';

describe('HeaderOverlay states', () => {
  beforeEach(() => {
    useUiStore.setState(useUiStore.getInitialState(), true);
  });

  afterEach(() => {
    cleanup();
  });

  it('shows a loading message and no timer while the round is loading', () => {
    // Given the round is still loading
    useUiStore.setState({ roundLoading: true, round: undefined, roundError: undefined });
    render(<HeaderOverlay />);

    // Then the header shows the loading message and no timer
    expect(screen.getByText('Loading round…')).toBeInTheDocument();
    expect(screen.queryByRole('timer')).toBeNull();
  });

  it('shows an actionable alert and no timer when the round fails to load', () => {
    // Given the round request failed with a service error
    useUiStore.setState({ roundLoading: false, round: undefined, roundError: 'Round service returned 500' });
    render(<HeaderOverlay />);

    // Then an alert explains the failure and no timer is shown
    expect(screen.getByRole('alert')).toHaveTextContent('Round unavailable: Round service returned 500');
    expect(screen.queryByRole('timer')).toBeNull();
  });

  it('shows a no-active-round message when there is no round', () => {
    // Given the world has no round and no loading or error state
    useUiStore.setState({ roundLoading: false, round: undefined, roundError: undefined });
    render(<HeaderOverlay />);

    // Then the header says there is no active round
    expect(screen.getByText('No active round')).toBeInTheDocument();
  });

  it('shows the round id, status and timer when a round is loaded', () => {
    // Given a loaded round
    useUiStore.setState({ roundLoading: false, round: roundFixture, roundError: undefined });
    render(<HeaderOverlay />);

    // Then the round pill shows the id and status, with a timer
    expect(screen.getByText(roundFixture.id)).toBeInTheDocument();
    expect(screen.getByText(roundFixture.status)).toBeInTheDocument();
    expect(screen.getByRole('timer')).toBeInTheDocument();
  });
});
