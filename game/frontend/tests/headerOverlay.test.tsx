import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { HeaderOverlay } from '../src/components/HeaderOverlay';
import { roundFixture } from './fixtures/api';

describe('HeaderOverlay round info', () => {
  afterEach(() => {
    cleanup();
  });

  it('shows logo, world, round id, status and timer', () => {
    // Given a ready round for the world "The Boy's Room"
    render(<HeaderOverlay worldTitle="The Boy's Room" round={roundFixture} />);

    // Then the header shows the logo, the world title, the round id and status, and a timer
    expect(screen.getByText('StoryForge')).toBeInTheDocument();
    expect(screen.getByText("The Boy's Room")).toBeInTheDocument();
    expect(screen.getByText(roundFixture.id)).toBeInTheDocument();
    expect(screen.getByText(roundFixture.status)).toBeInTheDocument();
    expect(screen.getByRole('timer')).toBeInTheDocument();
  });
});
