import { afterEach, describe, expect, it, vi } from 'vitest';
import { moveFocus } from '../src/engine/buildScene';
import type { ObjectSpec } from '../src/content/schema';
import { SceneObject } from '../src/entities/SceneObject';
import type { RenderContext, RenderHandle } from '../src/engine/renderContext';
import { createInitialState } from '../src/state/gameState';
import { validScene, validWorld } from './fixtures/valid-world';

// REQ1: moveFocus and SceneObject.sync run without findIndex/forEach, and hover reuses one event object.
// Fake render context only; no Phaser is loaded.

function makeSpec(id: string, overrides: Partial<ObjectSpec> = {}): ObjectSpec {
  return {
    ...(validScene.objects[0] as unknown as ObjectSpec),
    id,
    asset: 'door-sprite',
    position: { x: 120, y: 340 },
    scale: 2,
    layer: 'furniture',
    visibleWhen: [],
    ...overrides,
  } as ObjectSpec;
}

function makeFakeContext() {
  const captured: { hoverCb?: (over: boolean) => void } = {};
  const handle: RenderHandle = {
    setVisible: vi.fn(),
    destroy: vi.fn(),
    setHighlighted: vi.fn(),
    setLabelVisible: vi.fn(),
    onHover: vi.fn((cb: (over: boolean) => void) => {
      captured.hoverCb = cb;
    }),
    onClick: vi.fn(),
  };
  const ctx: RenderContext = { createSprite: vi.fn(() => handle) };
  return {
    ctx,
    get hoverCb() {
      return captured.hoverCb;
    },
  };
}

describe('moveFocus index loops', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('moveFocus skips the hidden middle object and never calls findIndex or forEach', () => {
    const state = createInitialState(validWorld, validScene);
    const objs = [
      new SceneObject(makeSpec('first'), makeFakeContext().ctx),
      // Hidden on the initial state because its visibleWhen flag 'a' is not set.
      new SceneObject(makeSpec('middle', { visibleWhen: [{ flag: 'a' }] }), makeFakeContext().ctx),
      new SceneObject(makeSpec('last'), makeFakeContext().ctx),
    ];
    for (const o of objs) o.sync(state);

    expect(objs[0].isVisible).toBe(true);
    expect(objs[1].isVisible).toBe(false);
    expect(objs[2].isVisible).toBe(true);

    const findIndexSpy = vi.spyOn(Array.prototype, 'findIndex');
    const forEachSpy = vi.spyOn(Array.prototype, 'forEach');

    moveFocus(objs, 1);
    expect(objs[0].isFocused).toBe(true);
    expect(objs[2].isFocused).toBe(false);

    moveFocus(objs, 1);
    expect(objs[0].isFocused).toBe(false);
    expect(objs[1].isFocused).toBe(false);
    expect(objs[2].isFocused).toBe(true);

    expect(findIndexSpy).not.toHaveBeenCalled();
    expect(forEachSpy).not.toHaveBeenCalled();
  });
});

describe('SceneObject hover event reuse', () => {
  it('gives the hover listener the same event object on every hover change', () => {
    const fake = makeFakeContext();
    const object = new SceneObject(makeSpec('door'), fake.ctx);
    object.sync(createInitialState(validWorld, validScene));

    const received: Array<{ objectId: string; over: boolean }> = [];
    object.onHoverChange((e) => {
      received.push(e);
    });

    fake.hoverCb?.(true);
    fake.hoverCb?.(true);

    expect(received).toHaveLength(2);
    expect(received[0]).toBe(received[1]);
    expect(received[1]).toEqual({ objectId: 'door', over: true });
  });
});
