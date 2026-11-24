import { act, cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Countdown, formatRemaining } from '../src/components/Countdown';
import { HeaderOverlay } from '../src/components/HeaderOverlay';
import { useUiStore } from '../src/store/uiStore';
import { roundFixture } from './fixtures/api';

describe('Countdown and header round status', () => {
  describe('formatRemaining', () => {
    it('formats 90000 ms as 00:01:30', () => {
      expect(formatRemaining(90_000)).toBe('00:01:30');
    });

    it('reports a closed round when no time remains', () => {
      expect(formatRemaining(0)).toBe('Round closed');
    });
  });

  describe('Countdown', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      cleanup();
      vi.useRealTimers();
    });

    it('shows 00:01:29 one second after 00:01:30 with an incrementing clock', () => {
      const endsAtMs = Date.parse(roundFixture.ends_at);
      // Clock starts 90 seconds before the round ends.
      let current = endsAtMs - 90_000;
      const now = () => current;

      render(<Countdown endsAt={roundFixture.ends_at} now={now} />);
      expect(screen.getByRole('timer')).toHaveTextContent('00:01:30');

      act(() => {
        current += 1_000;
        vi.advanceTimersByTime(1_000);
      });

      expect(screen.getByRole('timer')).toHaveTextContent('00:01:29');
    });

    it('shows Round closed once the end time has passed', () => {
      const endsAtMs = Date.parse(roundFixture.ends_at);
      let current = endsAtMs - 1_000;
      const now = () => current;

      render(<Countdown endsAt={roundFixture.ends_at} now={now} />);
      expect(screen.getByRole('timer')).toHaveTextContent('00:00:01');

      act(() => {
        current += 1_000;
        vi.advanceTimersByTime(1_000);
      });

      expect(screen.getByRole('timer')).toHaveTextContent('Round closed');
    });
  });

  describe('header round status', () => {
    beforeEach(() => {
      useUiStore.setState(useUiStore.getInitialState(), true);
    });

    afterEach(() => {
      cleanup();
    });

    it('shows the OPEN status in the header', () => {
      // Given the loaded round has status OPEN
      useUiStore.setState({ round: roundFixture, roundLoading: false, roundError: undefined });
      render(<HeaderOverlay />);

      // Then the header shows the OPEN status
      expect(screen.getByText('OPEN')).toBeInTheDocument();
    });

    it('shows the no-active-round fallback when there is no round', () => {
      // Given no round is loaded and no load is in flight
      useUiStore.setState({ round: undefined, roundLoading: false, roundError: undefined });
      render(<HeaderOverlay />);

      // Then the header shows the no-active-round fallback
      expect(screen.getByText('No active round')).toBeInTheDocument();
    });
  });
});
