import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { ObjectOverlay, type OverlayLayout } from '../src/components/ObjectOverlay';
import { scene, sceneSpec, world } from '../src/runtime/content';
import { createInitialState } from '@game/state/gameState';
import { getSceneView } from '@game/engine/scene';

// Real bedroom content: the view and the authored specs come from the bundled YAML, not from hand-written fixtures.
const view = getSceneView(createInitialState(world, scene), scene);
const objectsSpec = sceneSpec.objects;
const bookshelfView = view.find((o) => o.id === 'bookshelf');
const bookshelfSpec = objectsSpec.find((o) => o.id === 'bookshelf');

// zoom 2 on dpr 1 with a zero offset: the bookshelf top edge (y = 60 world px, bounds y = 0, scale 1) sits at 120 CSS px.
const layout: OverlayLayout = { left: 0, top: 0, zoom: 2, dpr: 1 };
const BOOKSHELF_TOP_Y = 120;

describe('ObjectOverlay with the real bedroom content', () => {
  it('resolves the bookshelf from the real content', () => {
    expect(bookshelfView).toBeDefined();
    expect(bookshelfSpec).toBeDefined();
  });

  it('shows the bookshelf name in upper case on the plate', () => {
    const { container } = render(
      <ObjectOverlay view={view} objectsSpec={objectsSpec} layout={layout} activeId="bookshelf" onAction={vi.fn()} />,
    );

    const plate = container.querySelector('[data-frame="plaque"]');
    expect(plate).not.toBeNull();
    expect(plate?.textContent).toBe(bookshelfSpec!.name.toUpperCase());
  });

  it('renders one upper-case button per action visible in the view, in order', () => {
    render(
      <ObjectOverlay view={view} objectsSpec={objectsSpec} layout={layout} activeId="bookshelf" onAction={vi.fn()} />,
    );

    const labels = bookshelfView!.actions.map((a) => a.label.toUpperCase());
    expect(labels.length).toBeGreaterThan(0);
    const buttons = screen.getAllByRole('button');
    expect(buttons.map((b) => b.textContent)).toEqual(labels);
  });

  it('places the plate at the top y of the anchor for the bookshelf', () => {
    const { container } = render(
      <ObjectOverlay view={view} objectsSpec={objectsSpec} layout={layout} activeId="bookshelf" onAction={vi.fn()} />,
    );

    const plate = container.querySelector('[data-frame="plaque"]') as HTMLElement | null;
    expect(plate).not.toBeNull();
    expect(plate!.style.top).toBe(`${BOOKSHELF_TOP_Y}px`);
  });

  it('calls onAction with the object id and the clicked action id', async () => {
    const onAction = vi.fn();
    render(
      <ObjectOverlay view={view} objectsSpec={objectsSpec} layout={layout} activeId="bookshelf" onAction={onAction} />,
    );

    const inspect = bookshelfView!.actions.find((a) => a.id === 'inspect')!;
    await userEvent.click(screen.getByRole('button', { name: inspect.label.toUpperCase() }));

    expect(onAction).toHaveBeenCalledTimes(1);
    expect(onAction).toHaveBeenCalledWith('bookshelf', 'inspect');
  });

  it('renders nothing when activeId is null', () => {
    const { container } = render(
      <ObjectOverlay view={view} objectsSpec={objectsSpec} layout={layout} activeId={null} onAction={vi.fn()} />,
    );

    expect(container).toBeEmptyDOMElement();
  });

  it('renders nothing when the layout is missing', () => {
    const { container } = render(
      <ObjectOverlay view={view} objectsSpec={objectsSpec} activeId="bookshelf" onAction={vi.fn()} />,
    );

    expect(container).toBeEmptyDOMElement();
  });
});
