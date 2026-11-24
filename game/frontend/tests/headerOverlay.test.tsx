import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { HeaderOverlay } from '../src/components/HeaderOverlay';
import { useUiStore } from '../src/store/uiStore';
import { world } from '../src/runtime/content';
import { roundFixture } from './fixtures/api';

describe('HeaderOverlay round info', () => {
  beforeEach(() => {
    useUiStore.setState(useUiStore.getInitialState(), true);
    useUiStore.setState({ roundLoading: false, round: roundFixture, roundError: undefined });
  });

  afterEach(() => {
    cleanup();
  });

  it('shows logo, world, round id, status and timer', () => {
    // Given a ready round in the store for the bundled world
    render(<HeaderOverlay />);

    // Then the header shows the logo, the world title, the round id and status, and a timer
    expect(screen.getByText('StoryForge')).toBeInTheDocument();
    expect(screen.getByText(world.title)).toBeInTheDocument();
    expect(screen.getByText(roundFixture.id)).toBeInTheDocument();
    expect(screen.getByText(roundFixture.status)).toBeInTheDocument();
    expect(screen.getByRole('timer')).toBeInTheDocument();
  });
});
