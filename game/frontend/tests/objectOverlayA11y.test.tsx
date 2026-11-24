import { act, cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ObjectOverlay } from '../src/components/ObjectOverlay';
import { type CanvasLayout } from '../src/lib/anchor';
import { phaserToReact } from '../src/phaser/events';
import { useGameStore } from '../src/store/gameStore';
import { useUiStore } from '../src/store/uiStore';

// The overlay is prop-less: it reads the focused object from the game store and the canvas layout from the UI store.
// The bundled `bookshelf` object carries the four actions these assertions check: Inspect, Push, Search and Leave.
const BOOKSHELF = 'bookshelf';
const layout: CanvasLayout = { left: 0, top: 0, zoom: 1, dpr: 1 };
const ACTION_LABELS = ['Inspect', 'Push', 'Search', 'Leave'];

// Only the action runner is spied on, the real implementation still runs.
vi.mock('../src/runtime/objectActions', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../src/runtime/objectActions')>();
  return { ...actual, performObjectAction: vi.fn(actual.performObjectAction) };
});

import { performObjectAction } from '../src/runtime/objectActions';

describe('ObjectOverlay a11y', () => {
  beforeEach(() => {
    useGameStore.getState().hydrate();
    useGameStore.getState().setFocusedObject(null);
    useUiStore.setState({ canvasLayout: layout });
  });

  // Unmount between tests so each query sees only the overlay rendered by that test.
  afterEach(() => {
    cleanup();
    useGameStore.getState().setFocusedObject(null);
    useUiStore.setState({ canvasLayout: undefined });
  });

  function focusBookshelf() {
    act(() => {
      useGameStore.getState().setFocusedObject(BOOKSHELF);
    });
  }

  it('renders a polite live region whose text contains the object name and action labels', () => {
    render(<ObjectOverlay />);
    focusBookshelf();

    const status = screen.getByRole('status');
    expect(status).toHaveAttribute('aria-live', 'polite');
    expect(status).toHaveTextContent('Bookshelf');
    for (const label of ACTION_LABELS) {
      expect(status).toHaveTextContent(label);
    }
  });

  it('gives each action button an aria-label of "<action label> <object name>"', () => {
    render(<ObjectOverlay />);
    focusBookshelf();

    for (const label of ACTION_LABELS) {
      expect(screen.getByRole('button', { name: `${label} Bookshelf` })).toBeInTheDocument();
    }
  });

  it('moves DOM focus to the first action button when the object is focused from the store', () => {
    render(<ObjectOverlay />);
    focusBookshelf();

    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Inspect Bookshelf' }));
  });

  it('moves focus from the first action button to the second on Tab', async () => {
    const user = userEvent.setup();
    render(<ObjectOverlay />);
    focusBookshelf();

    await user.tab();

    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Push Bookshelf' }));
  });

  it('runs the object action with the object and action ids when Enter is pressed on an action button', async () => {
    const user = userEvent.setup();
    render(<ObjectOverlay />);
    focusBookshelf();

    screen.getByRole('button', { name: 'Push Bookshelf' }).focus();
    await user.keyboard('{Enter}');

    expect(performObjectAction).toHaveBeenCalledTimes(1);
    expect(performObjectAction).toHaveBeenCalledWith('bookshelf', 'push');
  });

  it('emits menuClose on the phaserToReact bus when Escape is pressed inside the overlay', async () => {
    const user = userEvent.setup();
    const onMenuClose = vi.fn();
    const unsubscribe = phaserToReact.on('menuClose', onMenuClose);
    render(<ObjectOverlay />);
    focusBookshelf();

    try {
      screen.getByRole('button', { name: 'Inspect Bookshelf' }).focus();
      await user.keyboard('{Escape}');

      expect(onMenuClose).toHaveBeenCalledTimes(1);
    } finally {
      unsubscribe();
    }
  });
});
