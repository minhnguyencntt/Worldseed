import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { HeaderOverlay } from '../src/components/HeaderOverlay';
import { roundFixture } from './fixtures/api';

describe('HeaderOverlay suggest button', () => {
  afterEach(() => {
    cleanup();
  });

  it('clicking the suggest button calls onSuggest once', () => {
    // Given the header shows a ready round and an onSuggest handler
    const fn = vi.fn();
    render(<HeaderOverlay worldTitle="W" round={roundFixture} onSuggest={fn} />);

    // When the player clicks "Suggest What Happens Next"
    const button = screen.getByRole('button', { name: 'Suggest What Happens Next' });
    fireEvent.click(button);

    // Then onSuggest fires exactly once, and the button is the gold-styled suggest trigger
    expect(fn).toHaveBeenCalledTimes(1);
    expect(button.textContent).toBe('+ SUGGEST WHAT HAPPENS NEXT');
    expect(button.className).toContain('sf-btn-gold');
  });
});
