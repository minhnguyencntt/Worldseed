import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { HeaderOverlay } from '../src/components/HeaderOverlay';
import { useUiStore } from '../src/store/uiStore';
import { world } from '../src/runtime/content';
import { roundFixture } from './fixtures/api';

describe('HeaderOverlay kit structure', () => {
  beforeEach(() => {
    useUiStore.setState(useUiStore.getInitialState(), true);
    useUiStore.setState({ roundLoading: false, round: roundFixture, roundError: undefined });
  });

  afterEach(() => {
    cleanup();
  });

  it('pill holds dot, id and status', () => {
    // Given a ready round "round-1" with status OPEN in the store
    render(<HeaderOverlay />);

    // Then the status pill shows the round id and status
    expect(screen.getByTestId('round-pill')).toHaveTextContent('round-1');
    expect(screen.getByTestId('round-pill')).toHaveTextContent('OPEN');
    // And the dot reports the same status
    expect(screen.getByTestId('round-dot')).toHaveAttribute('data-status', 'OPEN');
  });

  it('plaque and logo', () => {
    // Given a header for the bundled world
    render(<HeaderOverlay />);

    // Then the world title sits inside a plaque frame
    expect(screen.getByText(world.title).closest('[data-frame="plaque"]')).not.toBeNull();
    // And the StoryForge logo is shown
    expect(screen.getByText('StoryForge')).toBeInTheDocument();
    // And the header bar carries the brass corner styling
    expect(screen.getByTestId('header-bar')).toHaveClass('sf-brass-corners');
    // And exactly one countdown timer is rendered
    expect(screen.getAllByRole('timer')).toHaveLength(1);
  });
});
