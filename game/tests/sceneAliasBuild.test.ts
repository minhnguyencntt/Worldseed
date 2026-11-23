import { describe, expect, it, vi } from 'vitest';
import { buildScene } from '@game/engine/buildScene';
import { SceneObject } from '@game/entities/SceneObject';
import { LAYER_ORDER, layerDepth } from '@game/engine/layers';
import type { RenderContext, RenderHandle, RenderSpriteSpec } from '@game/engine/renderContext';
import type { Layer, ObjectSpec, SceneSpec } from '@game/content/schema';
import { createInitialState, setFlag } from '@game/state/gameState';
import { validScene, validWorld } from './fixtures/valid-world';

// Fake render context: every createSprite call returns a fresh handle of vi.fn mocks.
// No Phaser runtime is loaded; the RenderContext interface is the only seam.
function fakeContext() {
  const createSprite = vi.fn((_spec: RenderSpriteSpec): RenderHandle => ({
    setVisible: vi.fn(),
    destroy: vi.fn(),
    setHighlighted: vi.fn(),
    setLabelVisible: vi.fn(),
    onHover: vi.fn(),
    onClick: vi.fn(),
  }));
  const ctx: RenderContext = { createSprite };
  return { ctx, createSprite };
}

// Authored ObjectSpec on the given layer, derived from the shared valid fixture object.
function objectOn(id: string, layer: Layer, overrides: Partial<ObjectSpec> = {}): ObjectSpec {
  const base = validScene.objects[0];
  return {
    id,
    name: base.name,
    description: base.description,
    asset: `${id}.png`,
    position: { x: 0, y: 0 },
    scale: 1,
    layer,
    actions: [],
    ...overrides,
  } as ObjectSpec;
}

function sceneWith(objects: ObjectSpec[]): SceneSpec {
  return {
    id: validScene.id,
    title: validScene.title,
    dialogue: [],
    objects,
  } as SceneSpec;
}

describe('scene build via @game', () => {
  it('returns objects in ascending depth order when they are authored out of layer order', () => {
    const { ctx } = fakeContext();
    const scene = sceneWith([
      objectOn('obj-ui', 'ui'),
      objectOn('obj-bg', 'background'),
      objectOn('obj-chr', 'characters'),
      objectOn('obj-fur', 'furniture'),
    ]);

    const objects = buildScene(ctx, scene);
    const depths = objects.map((o) => o.depth);

    expect(objects.every((o) => o instanceof SceneObject)).toBe(true);
    expect(depths).toEqual([...depths].sort((a, b) => a - b));
    expect(depths).toEqual([
      layerDepth('background'),
      layerDepth('furniture'),
      layerDepth('characters'),
      layerDepth('ui'),
    ]);
    expect(LAYER_ORDER.indexOf('background')).toBeLessThan(LAYER_ORDER.indexOf('ui'));
  });

  it('creates one sprite per authored object with key, position and scale taken from the spec', () => {
    const { ctx, createSprite } = fakeContext();
    const scene = sceneWith([
      objectOn('obj-a', 'objects', { asset: 'door.png', position: { x: 120, y: 340 }, scale: 2 }),
      objectOn('obj-b', 'background', { asset: 'wall.png', position: { x: 0, y: 0 }, scale: 1 }),
      objectOn('obj-c', 'furniture', { asset: 'bed.png', position: { x: 50, y: 60 }, scale: 3 }),
    ]);

    buildScene(ctx, scene);

    expect(createSprite).toHaveBeenCalledTimes(scene.objects.length);
    expect(createSprite).toHaveBeenCalledWith(
      expect.objectContaining({ key: 'door.png', x: 120, y: 340, scale: 2 }),
    );
    expect(createSprite).toHaveBeenCalledWith(
      expect.objectContaining({ key: 'wall.png', x: 0, y: 0, scale: 1 }),
    );
    expect(createSprite).toHaveBeenCalledWith(
      expect.objectContaining({ key: 'bed.png', x: 50, y: 60, scale: 3 }),
    );
  });

  it('shows and hides an object following its visibleWhen flag through sync', () => {
    const { ctx, createSprite } = fakeContext();
    const objects = buildScene(
      ctx,
      sceneWith([objectOn('obj-gated', 'objects', { visibleWhen: [{ flag: 'a' }] } as Partial<ObjectSpec>)]),
    );
    const handle = createSprite.mock.results[0].value as RenderHandle;

    const initial = createInitialState(validWorld, validScene);
    objects[0].sync(initial);
    objects[0].sync(setFlag(initial, 'a', true));

    expect(handle.setVisible).toHaveBeenNthCalledWith(1, false);
    expect(handle.setVisible).toHaveBeenNthCalledWith(2, true);
    expect(handle.setVisible).toHaveBeenCalledTimes(2);
  });
});
