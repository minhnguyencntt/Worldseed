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

// Fake render context. The hover and click callbacks are captured as they are
// registered on the handle, and exposed through getters so tests can invoke them
// after the SceneObject has been constructed.
function makeFakeContext() {
  const captured: { hoverCb?: (over: boolean) => void; clickCb?: () => void } = {};
  const handle: RenderHandle = {
    setVisible: vi.fn(),
    destroy: vi.fn(),
    setHighlighted: vi.fn(),
    setLabelVisible: vi.fn(),
    onHover: vi.fn((cb: (over: boolean) => void) => {
      captured.hoverCb = cb;
    }),
    onClick: vi.fn((cb: () => void) => {
      captured.clickCb = cb;
    }),
  };
  const ctx: RenderContext = { createSprite: vi.fn(() => handle) };
  return {
    ctx,
    handle,
    get hoverCb() {
      return captured.hoverCb;
    },
    get clickCb() {
      return captured.clickCb;
    },
  };
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
      label: spec.name,
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

  it('passes label and bounds to createSprite', () => {
    const { ctx } = makeFakeContext();
    const spec = makeSpec({ interactionBounds: { x: 0, y: 0, width: 40, height: 80 } });

    new SceneObject(spec, ctx);

    expect(ctx.createSprite).toHaveBeenCalledWith(
      expect.objectContaining({
        label: spec.name,
        bounds: { x: 0, y: 0, width: 40, height: 80 },
      }),
    );
  });

  it('toggles highlight and label on hover only while visible', () => {
    const fake = makeFakeContext();
    const object = new SceneObject(makeSpec(), fake.ctx);
    const initial = createInitialState(validWorld, validScene);

    // Flag unset: the object is hidden, so hover must not highlight it.
    object.sync(initial);
    fake.hoverCb?.(true);
    expect(vi.mocked(fake.handle.setHighlighted).mock.calls).not.toContainEqual([true]);
    expect(vi.mocked(fake.handle.setLabelVisible).mock.calls).not.toContainEqual([true]);

    // Flag set: the object is visible, so hover toggles highlight and label.
    vi.mocked(fake.handle.setHighlighted).mockClear();
    vi.mocked(fake.handle.setLabelVisible).mockClear();
    object.sync(setFlag(initial, 'a', true));
    fake.hoverCb?.(true);
    fake.hoverCb?.(false);
    expect(vi.mocked(fake.handle.setHighlighted).mock.calls).toEqual([[true], [false]]);
    expect(vi.mocked(fake.handle.setLabelVisible).mock.calls).toEqual([[true], [false]]);
  });

  it('emits interact on click only when visible', () => {
    const fake = makeFakeContext();
    const spec = makeSpec({
      actions: [
        { id: 'inspect', label: 'Inspect', events: [] },
        { id: 'push', label: 'Push', conditions: [{ flag: 'a' }], events: [] },
        { id: 'leave', label: 'Leave', conditions: [{ flag: 'b' }], events: [] },
      ],
    });
    const object = new SceneObject(spec, fake.ctx);
    const listener = vi.fn();
    object.onInteract(listener);
    const initial = createInitialState(validWorld, validScene);

    // Visible: exactly one event, carrying only the actions whose conditions hold.
    const shown = setFlag(initial, 'a', true);
    object.sync(shown);
    fake.clickCb?.();
    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith({
      objectId: spec.id,
      actions: [spec.actions[0], spec.actions[1]],
    });

    // Hidden: clicking emits nothing.
    listener.mockClear();
    object.sync(initial);
    fake.clickCb?.();
    expect(listener).not.toHaveBeenCalled();
  });
});
