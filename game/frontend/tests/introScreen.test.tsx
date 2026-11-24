// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
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

  it('shows the intro as a dialog named "Introduction" containing the story text', () => {
    // Given the IntroScreen is rendered,
    // when the dialog is queried by its role,
    // then it is accessibly named "Introduction" and contains "You decide.".
    const onBegin = vi.fn();
    render(<IntroScreen onBegin={onBegin} />);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAccessibleName('Introduction');
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

  it('calls onBegin once when Escape is pressed', async () => {
    // Given the IntroScreen dialog is open,
    // when Escape is pressed inside the dialog,
    // then onBegin is called exactly once.
    const onBegin = vi.fn();
    render(<IntroScreen onBegin={onBegin} />);
    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' });
    await waitFor(() => expect(onBegin).toHaveBeenCalledTimes(1));
  });

  it('keeps focus inside the dialog', async () => {
    // Given the IntroScreen dialog is open beside an outside button,
    // when Tab is pressed on Begin, focus stays on Begin (the only tabbable control),
    // and when focus is moved to the outside button, it is pulled back into the dialog.
    const onBegin = vi.fn();
    render(
      <>
        <button type="button">Outside</button>
        <IntroScreen onBegin={onBegin} />
      </>,
    );
    const dialog = screen.getByRole('dialog');
    const begin = within(dialog).getByRole('button', { name: 'Begin' });
    expect(within(dialog).getAllByRole('button')).toEqual([begin]);

    begin.focus();
    fireEvent.keyDown(begin, { key: 'Tab' });
    expect(document.activeElement).toBe(begin);

    const outside = screen.getByText('Outside');
    outside.focus();
    await waitFor(() => expect(dialog.contains(document.activeElement)).toBe(true));
    expect(document.activeElement).not.toBe(outside);
  });
});
