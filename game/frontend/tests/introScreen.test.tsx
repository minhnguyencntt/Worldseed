// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { IntroScreen } from '../src/components/IntroScreen';

describe('IntroScreen styled', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders a full-screen backdrop section', () => {
    // Given the IntroScreen is rendered,
    // when its container is inspected,
    // then the root section carries the fullscreen backdrop class.
    const onBegin = vi.fn();
    const { container } = render(<IntroScreen onBegin={onBegin} />);
    const section = container.querySelector('section');
    expect(section).not.toBeNull();
    expect(section).toHaveClass('sf-fullscreen-bg');
  });

  it('shows the intro dialog as a centered parchment frame with the story text', () => {
    // Given the IntroScreen is rendered,
    // when the parchment dialog frame is queried,
    // then it has the parchment frame and dialog classes and contains "You decide.".
    const onBegin = vi.fn();
    const { container } = render(<IntroScreen onBegin={onBegin} />);
    const dialog = container.querySelector('.sf-frame-parchment.sf-dialog');
    expect(dialog).not.toBeNull();
    expect(dialog).toHaveTextContent('You decide.');
  });

  it('calls onBegin exactly once when the Begin button is clicked', () => {
    // Given the IntroScreen is rendered with an onBegin callback,
    // when the "Begin" button is clicked,
    // then the callback is invoked exactly once.
    const onBegin = vi.fn();
    render(<IntroScreen onBegin={onBegin} />);
    fireEvent.click(screen.getByRole('button', { name: 'Begin' }));
    expect(onBegin).toHaveBeenCalledTimes(1);
  });
});
