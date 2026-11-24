import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { ObjectSpec } from '@game/content/schema';
import type { SceneObjectView } from '@game/engine/scene';
import { ObjectOverlay, type OverlayLayout } from '../src/components/ObjectOverlay';
import { phaserToReact } from '../src/phaser/events';

// Fixture mirrors the real `bookshelf` object in src/content/worlds/the-boys-room/scenes/bedroom.yaml.
const bookshelfSpec = {
  id: 'bookshelf',
  name: 'Bookshelf',
  description: 'A tall bookshelf crammed with worn paperbacks.',
  asset: 'room/bookshelf',
  position: { x: 150, y: 60 },
  scale: 1,
  layer: 'furniture',
  interactionBounds: { x: 0, y: 0, width: 48, height: 96 },
  persistentState: { flag: 'secret_door_open' },
  actions: [],
} as unknown as ObjectSpec;

const bookshelfView = {
  id: 'bookshelf',
  name: 'Bookshelf',
  description: 'A tall bookshelf crammed with worn paperbacks.',
  asset: 'room/bookshelf',
  position: { x: 150, y: 60 },
  scale: 1,
  layer: 'furniture',
  interactionBounds: { x: 0, y: 0, width: 48, height: 96 },
  persistentState: { flag: 'secret_door_open' },
  open: true,
  actions: [
    { id: 'inspect', label: 'Inspect', events: [] },
    { id: 'push', label: 'Push', events: [] },
    { id: 'search', label: 'Search', events: [] },
    { id: 'leave', label: 'Leave', events: [] },
  ],
} as unknown as SceneObjectView;

const layout: OverlayLayout = { left: 0, top: 0, zoom: 1, dpr: 1 };
const ACTION_LABELS = ['Inspect', 'Push', 'Search', 'Leave'];

describe('ObjectOverlay a11y', () => {
  it('renders a polite live region whose text contains the object name and action labels', () => {
    render(
      <ObjectOverlay
        view={[bookshelfView]}
        objectsSpec={[bookshelfSpec]}
        layout={layout}
        activeId="bookshelf"
        onAction={vi.fn()}
      />,
    );

    const status = screen.getByRole('status');
    expect(status).toHaveAttribute('aria-live', 'polite');
    expect(status).toHaveTextContent('Bookshelf');
    for (const label of ACTION_LABELS) {
      expect(status).toHaveTextContent(label);
    }
  });

  it('gives each action button an aria-label of "<action label> <object name>"', () => {
    render(
      <ObjectOverlay
        view={[bookshelfView]}
        objectsSpec={[bookshelfSpec]}
        layout={layout}
        activeId="bookshelf"
        onAction={vi.fn()}
      />,
    );

    for (const label of ACTION_LABELS) {
      expect(screen.getByRole('button', { name: `${label} Bookshelf` })).toBeInTheDocument();
    }
  });

  it('moves DOM focus to the first action button when focusFirstAction is set', () => {
    render(
      <ObjectOverlay
        view={[bookshelfView]}
        objectsSpec={[bookshelfSpec]}
        layout={layout}
        activeId="bookshelf"
        onAction={vi.fn()}
        focusFirstAction
      />,
    );

    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Inspect Bookshelf' }));
  });

  it('moves focus from the first action button to the second on Tab', async () => {
    const user = userEvent.setup();
    render(
      <ObjectOverlay
        view={[bookshelfView]}
        objectsSpec={[bookshelfSpec]}
        layout={layout}
        activeId="bookshelf"
        onAction={vi.fn()}
        focusFirstAction
      />,
    );

    await user.tab();

    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Push Bookshelf' }));
  });

  it('calls onAction with the object and action ids when Enter is pressed on an action button', async () => {
    const user = userEvent.setup();
    const onAction = vi.fn();
    render(
      <ObjectOverlay
        view={[bookshelfView]}
        objectsSpec={[bookshelfSpec]}
        layout={layout}
        activeId="bookshelf"
        onAction={onAction}
      />,
    );

    screen.getByRole('button', { name: 'Push Bookshelf' }).focus();
    await user.keyboard('{Enter}');

    expect(onAction).toHaveBeenCalledTimes(1);
    expect(onAction).toHaveBeenCalledWith('bookshelf', 'push');
  });

  it('emits menuClose on the phaserToReact bus when Escape is pressed inside the overlay', async () => {
    const user = userEvent.setup();
    const emit = vi.spyOn(phaserToReact, 'emit');
    render(
      <ObjectOverlay
        view={[bookshelfView]}
        objectsSpec={[bookshelfSpec]}
        layout={layout}
        activeId="bookshelf"
        onAction={vi.fn()}
      />,
    );

    screen.getByRole('button', { name: 'Inspect Bookshelf' }).focus();
    await user.keyboard('{Escape}');

    expect(emit).toHaveBeenCalledWith('menuClose', {});
  });
});
