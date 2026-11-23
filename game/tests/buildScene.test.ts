import { describe, it, expect, vi } from 'vitest';
import { buildScene } from '../src/engine/buildScene';
import type { RenderContext, RenderSpriteSpec, RenderHandle } from '../src/engine/renderContext';
import type { Layer, ObjectSpec, SceneSpec } from '../src/content/schema';
import { validScene } from './fixtures/valid-world';

// Fake render context: every createSprite call returns a fresh handle mock.
function fakeContext() {
  const createSprite = vi.fn((_spec: RenderSpriteSpec): RenderHandle => ({
    setVisible: vi.fn(),
    destroy: vi.fn(),
  }));
  const ctx: RenderContext = { createSprite };
  return { ctx, createSprite };
}

// Builds one authored ObjectSpec on the given layer, based on the shared valid fixture object.
function objectOn(id: string, layer: Layer): ObjectSpec {
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
  };
}

// SceneSpec built from the valid fixture scene, with the given objects.
function sceneWith(objects: ObjectSpec[]): SceneSpec {
  return {
    id: validScene.id,
    title: validScene.title,
    dialogue: [],
    objects,
  };
}

describe('buildScene', () => {
  it('orders the returned objects background, furniture, objects regardless of input order', () => {
    const { ctx } = fakeContext();
    const scene = sceneWith([
      objectOn('obj-a', 'objects'),
      objectOn('obj-b', 'background'),
      objectOn('obj-c', 'furniture'),
    ]);

    const result = buildScene(ctx, scene);

    expect(result.map((o) => o.spec.layer)).toEqual(['background', 'furniture', 'objects']);
  });

  it('creates exactly one sprite per authored object', () => {
    const { ctx, createSprite } = fakeContext();
    const scene = sceneWith([
      objectOn('obj-a', 'objects'),
      objectOn('obj-b', 'background'),
      objectOn('obj-c', 'furniture'),
    ]);

    buildScene(ctx, scene);

    expect(createSprite).toHaveBeenCalledTimes(3);
  });

  it('returns an empty list and creates no sprites when the scene has no objects', () => {
    const { ctx, createSprite } = fakeContext();

    const result = buildScene(ctx, sceneWith([]));

    expect(result).toEqual([]);
    expect(createSprite).not.toHaveBeenCalled();
  });
});
