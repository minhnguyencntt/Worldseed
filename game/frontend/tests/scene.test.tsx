// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ActionMenu } from '../src/components/ActionMenu';
import { SceneView } from '../src/components/SceneView';
import { ASSET_PATHS } from '../src/runtime/assets';
import { scene, world } from '../src/runtime/content';
import { getSceneView } from '../../src/engine/scene';
import { createInitialState } from '../../src/state/gameState';

describe('scene hotspots and action menu', () => {
  afterEach(() => {
    cleanup();
  });

  it('clicking an object opens its actions', () => {
    const objects = getSceneView(createInitialState(world, scene), scene);
    const onSelect = vi.fn();

    render(
      <SceneView
        sceneId={scene.id}
        title={scene.title}
        objects={objects}
        selectedId={undefined}
        onSelect={onSelect}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Bookshelf' }));

    expect(onSelect).toHaveBeenCalledWith('bookshelf');

    const bookshelf = objects.find((obj) => obj.id === 'bookshelf');
    const onAction = vi.fn();

    render(<ActionMenu object={bookshelf} onAction={onAction} />);

    fireEvent.click(screen.getByRole('button', { name: 'Search' }));

    expect(onAction).toHaveBeenCalledWith('bookshelf', 'search');
  });

  it('asset map is replaceable', () => {
    const original = ASSET_PATHS['scene:bedroom'];
    try {
      ASSET_PATHS['scene:bedroom'] = '/x.svg';
      const objects = getSceneView(createInitialState(world, scene), scene);

      const { container } = render(
        <SceneView
          sceneId={scene.id}
          title={scene.title}
          objects={objects}
          selectedId={undefined}
          onSelect={vi.fn()}
        />,
      );

      const img = container.querySelector('img.scene-background');
      expect(img?.getAttribute('src')).toMatch(/\/x\.svg$/);
    } finally {
      ASSET_PATHS['scene:bedroom'] = original;
    }
  });
});
