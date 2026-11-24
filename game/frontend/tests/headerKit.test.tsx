import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { HeaderOverlay } from '../src/components/HeaderOverlay';
import { roundFixture } from './fixtures/api';

describe('HeaderOverlay kit structure', () => {
  afterEach(() => {
    cleanup();
  });

  it('pill holds dot, id and status', () => {
    // Given a ready round "round-1" with status OPEN
    render(<HeaderOverlay worldTitle="The Boy's Room" round={roundFixture} />);

    // Then the status pill shows the round id and status
    expect(screen.getByTestId('round-pill')).toHaveTextContent('round-1');
    expect(screen.getByTestId('round-pill')).toHaveTextContent('OPEN');
    // And the dot reports the same status
    expect(screen.getByTestId('round-dot')).toHaveAttribute('data-status', 'OPEN');
  });

  it('plaque and logo', () => {
    // Given a header for the world "The Boy's Room"
    render(<HeaderOverlay worldTitle="The Boy's Room" round={roundFixture} />);

    // Then the world title sits inside a plaque frame
    expect(screen.getByText("The Boy's Room").closest('[data-frame="plaque"]')).not.toBeNull();
    // And the StoryForge logo is shown
    expect(screen.getByText('StoryForge')).toBeInTheDocument();
    // And the header bar carries the brass corner styling
    expect(screen.getByTestId('header-bar')).toHaveClass('sf-brass-corners');
    // And exactly one countdown timer is rendered
    expect(screen.getAllByRole('timer')).toHaveLength(1);
  });
});
