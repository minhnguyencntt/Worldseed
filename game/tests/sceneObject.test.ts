import { describe, expect, it, vi } from 'vitest';
import type { ObjectSpec } from '../src/content/schema';
import { SceneObject } from '../src/entities/SceneObject';
import { layerDepth } from '../src/engine/layers';
import type { RenderContext, RenderHandle } from '../src/engine/renderContext';
import { createInitialState, setFlag } from '../src/state/gameState';
import { validScene, validWorld } from './fixtures/valid-world';

// validScene.objects[0] is a plain ObjectDef (no asset/position/layer/scale), while
// SceneObject consumes the stricter ObjectSpec from the content schema. Extend the
// fixture object with the spec-only fields here so the shared fixture stays untouched.
function makeSpec(overrides: Partial<ObjectSpec> = {}): ObjectSpec {
  return {
    ...(validScene.objects[0] as unknown as ObjectSpec),
    asset: 'door-sprite',
    position: { x: 120, y: 340 },
    scale: 2,
    layer: 'furniture',
    visibleWhen: [{ flag: 'a' }],
    ...overrides,
  } as ObjectSpec;
}

function makeFakeContext() {
  const handle: RenderHandle = { setVisible: vi.fn(), destroy: vi.fn() };
  const ctx: RenderContext = { createSprite: vi.fn(() => handle) };
  return { ctx, handle };
}

describe('SceneObject', () => {
  it('creates exactly one sprite with key, position, scale and layer depth on construction', () => {
    const { ctx } = makeFakeContext();
    const spec = makeSpec();

    new SceneObject(spec, ctx);

    expect(ctx.createSprite).toHaveBeenCalledTimes(1);
    expect(ctx.createSprite).toHaveBeenCalledWith({
      key: 'door-sprite',
      x: 120,
      y: 340,
      scale: 2,
      depth: layerDepth('furniture'),
    });
  });

  it('hides and then shows the sprite as the visibleWhen flag is set', () => {
    const { ctx, handle } = makeFakeContext();
    const object = new SceneObject(makeSpec(), ctx);

    const initial = createInitialState(validWorld, validScene);
    object.sync(initial);
    const shown = setFlag(initial, 'a', true);
    object.sync(shown);

    expect(handle.setVisible).toHaveBeenCalledTimes(2);
    expect(vi.mocked(handle.setVisible).mock.calls).toEqual([[false], [true]]);
  });

  it('destroys the render handle exactly once on destroy', () => {
    const { ctx, handle } = makeFakeContext();
    const object = new SceneObject(makeSpec(), ctx);

    object.destroy();

    expect(handle.destroy).toHaveBeenCalledTimes(1);
  });
});
