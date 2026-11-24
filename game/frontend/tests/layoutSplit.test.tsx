// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { GameLayout } from '../src/components/GameLayout';
import { useUiStore } from '../src/store/uiStore';

describe('GameLayout narrow drawer', () => {
  beforeEach(() => {
    useUiStore.setState({ drawerOpen: false });
  });

  afterEach(() => {
    cleanup();
    useUiStore.setState({ drawerOpen: false });
  });

  it('narrow drawer classes and toggle: Given GameLayout with a scene and a story, when rendered closed and the Story button is clicked, then the aside is a fixed bottom drawer that opens and the store reflects it', () => {
    // Given GameLayout rendered with a scene node and a story node and the drawer closed,
    // when the aside is inspected,
    // then it carries the narrow (max-md) fixed bottom drawer classes and data-state closed;
    // when the Story button is clicked,
    // then data-state becomes open and the ui store drawerOpen flag is true.
    const { container } = render(<GameLayout scene={<div />} story={<div />} />);

    const aside = container.querySelector('aside');
    expect(aside).not.toBeNull();
    expect(aside).toHaveClass('max-md:fixed', 'max-md:bottom-0');
    expect(aside).toHaveAttribute('data-state', 'closed');

    fireEvent.click(screen.getByRole('button', { name: /story/i }));

    expect(aside).toHaveAttribute('data-state', 'open');
    expect(useUiStore.getState().drawerOpen).toBe(true);
  });
});
