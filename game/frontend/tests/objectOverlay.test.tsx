import { act, cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ObjectOverlay } from '../src/components/ObjectOverlay';
import { anchorFor, type CanvasLayout } from '../src/lib/anchor';
import { phaserToReact } from '../src/phaser/events';
import { sceneSpec } from '../src/runtime/content';
import { useGameStore } from '../src/store/gameStore';
import { useUiStore } from '../src/store/uiStore';

// The overlay reads everything from the stores and the event bus, so it is rendered without props.
// The object under test is the first object in the bundled bedroom spec (`bed`).
const firstSpec = sceneSpec.objects[0];
const firstId = firstSpec.id;

const START_LAYOUT: CanvasLayout = { left: 0, top: 0, zoom: 1, dpr: 1 };
const MOVED_LAYOUT: CanvasLayout = { left: 50, top: 10, zoom: 2, dpr: 1 };

// The anchor the overlay must place its plaque at, computed from the same spec object the overlay reads.
function expectedTopAnchor(layout: CanvasLayout) {
  const anchor = anchorFor({
    position: firstSpec.position,
    bounds: firstSpec.interactionBounds,
    scale: firstSpec.scale,
    zoom: layout.zoom,
    offset: { left: layout.left, top: layout.top },
    dpr: layout.dpr,
  });
  if (!anchor) throw new Error('first object has no interaction bounds');
  return anchor.top;
}

function plaque(container: HTMLElement) {
  return container.querySelector<HTMLElement>('[data-frame="plaque"]');
}

// Only the action runner is spied on, the real implementation still runs, so the bridge is exercised end to end.
vi.mock('../src/runtime/objectActions', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../src/runtime/objectActions')>();
  return { ...actual, performObjectAction: vi.fn(actual.performObjectAction) };
});

import { performObjectAction } from '../src/runtime/objectActions';

describe('ObjectOverlay driven by events and stores', () => {
  beforeEach(() => {
    useGameStore.getState().hydrate();
    useGameStore.getState().setFocusedObject(null);
    useUiStore.setState({ canvasLayout: START_LAYOUT });
  });

  // Vitest runs without globals, so RTL does not clean up on its own; unmount between tests so queries see one overlay.
  afterEach(() => {
    cleanup();
    useGameStore.getState().setFocusedObject(null);
    useUiStore.setState({ canvasLayout: undefined });
  });

  it('shows the uppercased object name on the plaque after a hover event', () => {
    const { container } = render(<ObjectOverlay />);

    act(() => {
      phaserToReact.emit('objectHover', { id: firstId });
    });

    expect(plaque(container)?.textContent).toBe(firstSpec.name.toUpperCase());
  });

  it('anchors the plaque to the top-centre of the object bounds computed by anchorFor', () => {
    const { container } = render(<ObjectOverlay />);

    act(() => {
      phaserToReact.emit('objectHover', { id: firstId });
    });

    const top = expectedTopAnchor(START_LAYOUT);
    expect(plaque(container)!.style.left).toBe(`${top.x}px`);
    expect(plaque(container)!.style.top).toBe(`${top.y}px`);
  });

  it('renders one upper-case button per action of the object, in order', () => {
    render(<ObjectOverlay />);

    act(() => {
      phaserToReact.emit('objectHover', { id: firstId });
    });

    const labels = firstSpec.actions.map((a) => a.label.toUpperCase());
    expect(labels.length).toBeGreaterThan(0);
    expect(screen.getAllByRole('button').map((b) => b.textContent)).toEqual(labels);
  });

  it('moves on layout change', () => {
    const { container } = render(<ObjectOverlay />);
    act(() => {
      phaserToReact.emit('objectHover', { id: firstId });
    });
    const before = expectedTopAnchor(START_LAYOUT);

    act(() => {
      useUiStore.setState({ canvasLayout: MOVED_LAYOUT });
    });

    const after = expectedTopAnchor(MOVED_LAYOUT);
    expect(after).not.toEqual(before);
    expect(plaque(container)!.style.left).toBe(`${after.x}px`);
    expect(plaque(container)!.style.top).toBe(`${after.y}px`);
  });

  it('menuClose clears click selection', () => {
    const { container } = render(<ObjectOverlay />);
    act(() => {
      phaserToReact.emit('objectClick', { id: firstId });
    });
    expect(plaque(container)).not.toBeNull();

    act(() => {
      phaserToReact.emit('menuClose', {});
    });

    expect(plaque(container)).toBeNull();
    expect(container).toBeEmptyDOMElement();
  });

  it('store focus shows overlay', () => {
    const { container } = render(<ObjectOverlay />);

    act(() => {
      useGameStore.getState().setFocusedObject(firstId);
    });

    expect(plaque(container)?.textContent).toBe(firstSpec.name.toUpperCase());
  });

  it('renders nothing when no object is hovered, clicked or focused', () => {
    const { container } = render(<ObjectOverlay />);

    expect(container).toBeEmptyDOMElement();
  });

  it('renders nothing when the canvas layout is missing', () => {
    act(() => {
      useUiStore.setState({ canvasLayout: undefined });
    });
    const { container } = render(<ObjectOverlay />);

    act(() => {
      phaserToReact.emit('objectHover', { id: firstId });
    });

    expect(container).toBeEmptyDOMElement();
  });

  it('clicking an action runs performObjectAction with the object and action ids', async () => {
    const user = userEvent.setup();
    render(<ObjectOverlay />);
    act(() => {
      phaserToReact.emit('objectHover', { id: firstId });
    });

    const action = firstSpec.actions[0];
    await user.click(screen.getByRole('button', { name: `${action.label} ${firstSpec.name}` }));

    expect(performObjectAction).toHaveBeenCalledWith(firstId, action.id);
  });
});
