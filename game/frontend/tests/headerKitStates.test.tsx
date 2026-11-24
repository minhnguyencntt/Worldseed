import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { HeaderOverlay } from '../src/components/HeaderOverlay';
import { useUiStore } from '../src/store/uiStore';
import { roundFixture } from './fixtures/api';

describe('HeaderOverlay pill states', () => {
  beforeEach(() => {
    useUiStore.setState(useUiStore.getInitialState(), true);
    useUiStore.setState({ soundEnabled: true, settingsOpen: false });
  });

  afterEach(() => {
    cleanup();
  });

  it('shows the loading pill with no timer while the round is loading', () => {
    // Given the round is still loading
    useUiStore.setState({ roundLoading: true, round: undefined, roundError: undefined });
    render(<HeaderOverlay />);

    // Then the round pill is in the loading state with the loading text
    const pill = screen.getByTestId('round-pill');
    expect(pill).toHaveAttribute('data-state', 'loading');
    expect(pill).toHaveTextContent('Loading round…');
    // And no countdown timer is rendered
    expect(screen.queryByRole('timer')).toBeNull();
  });

  it('shows the error pill with an alert and a Retry button that reloads the round', () => {
    // Given the round request failed with a service error
    useUiStore.setState({ roundLoading: false, round: undefined, roundError: 'Round service returned 500' });
    render(<HeaderOverlay />);

    // Then the round pill is in the error state
    expect(screen.getByTestId('round-pill')).toHaveAttribute('data-state', 'error');
    // And an alert explains the failure
    expect(screen.getByRole('alert')).toHaveTextContent('Round unavailable: Round service returned 500');
    // And a Retry button is offered
    expect(screen.getByRole('button', { name: 'Retry' })).toBeInTheDocument();
  });

  it('shows the empty pill with the no-active-round message when there is no round', () => {
    // Given the world has no round and no loading or error state
    useUiStore.setState({ roundLoading: false, round: undefined, roundError: undefined });
    render(<HeaderOverlay />);

    // Then the round pill is in the empty state
    const pill = screen.getByTestId('round-pill');
    expect(pill).toHaveAttribute('data-state', 'empty');
    // And it says there is no active round
    expect(pill).toHaveTextContent('No active round');
  });

  it('toggles sound and opens settings through the header icon controls in the store', () => {
    // Given the header shows a loaded round with sound on and settings closed
    useUiStore.setState({ roundLoading: false, round: roundFixture, roundError: undefined });
    render(<HeaderOverlay />);
    const controls = within(screen.getByRole('group', { name: 'Header controls' }));

    // When the player clicks the sound toggle
    fireEvent.click(controls.getByRole('button', { name: 'Toggle sound' }));
    // Then the real uiStore sound flag is turned off
    expect(useUiStore.getState().soundEnabled).toBe(false);

    // When the player clicks the settings button
    fireEvent.click(controls.getByRole('button', { name: 'Settings' }));
    // Then the real uiStore settings flag is turned on
    expect(useUiStore.getState().settingsOpen).toBe(true);
  });
});
