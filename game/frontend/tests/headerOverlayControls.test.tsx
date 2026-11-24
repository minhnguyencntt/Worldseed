import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { HeaderOverlay } from '../src/components/HeaderOverlay';
import { useUiStore } from '../src/store/uiStore';
import { roundFixture } from './fixtures/api';

describe('HeaderOverlay controls', () => {
  beforeEach(() => {
    useUiStore.setState(useUiStore.getInitialState(), true);
    useUiStore.setState({ soundEnabled: true, settingsOpen: false, roundLoading: false, round: roundFixture, roundError: undefined });
  });

  afterEach(() => {
    cleanup();
  });

  it('sound button toggles soundEnabled', () => {
    // Given a header showing the round, with sound currently on
    render(<HeaderOverlay />);
    const soundButton = screen.getByRole('button', { name: 'Toggle sound' });
    expect(soundButton).toHaveAttribute('aria-pressed', 'true');

    // When the player clicks the sound toggle
    fireEvent.click(soundButton);

    // Then the real store has sound disabled and the button reports it as not pressed
    expect(useUiStore.getState().soundEnabled).toBe(false);
    expect(screen.getByRole('button', { name: 'Toggle sound' })).toHaveAttribute('aria-pressed', 'false');
  });

  it('settings button opens settings', () => {
    // Given a header with the settings panel closed
    render(<HeaderOverlay />);
    expect(useUiStore.getState().settingsOpen).toBe(false);

    // When the player clicks the settings button
    fireEvent.click(screen.getByRole('button', { name: 'Settings' }));

    // Then the real store reports settings as open
    expect(useUiStore.getState().settingsOpen).toBe(true);
  });
});
