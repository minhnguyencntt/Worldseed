import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { SceneObject } from '@game/entities/SceneObject';
import { createInputLayer, type InputPlugin } from '../src/phaser/input';
import { phaserToReact } from '../src/phaser/events';

// Fake SceneObject: captures the callbacks input.ts registers with onInteract and onHoverChange,
// so the test can fire pointer events by hand. No Phaser runtime is started.
interface FakeObject {
  spec: { id: string };
  isVisible: boolean;
  isFocused: boolean;
  focus: () => void;
  blur: () => void;
  onInteract: ReturnType<typeof vi.fn>;
  onHoverChange: ReturnType<typeof vi.fn>;
  interactCallback: (e: { objectId: string; actions: unknown[] }) => void;
  hoverCallback: (e: { objectId: string; over: boolean }) => void;
}

function fakeObject(id: string): FakeObject {
  const obj: FakeObject = {
    spec: { id },
    isVisible: true,
    isFocused: false,
    focus: () => {
      obj.isFocused = true;
    },
    blur: () => {
      obj.isFocused = false;
    },
    onInteract: vi.fn((cb: FakeObject['interactCallback']) => {
      obj.interactCallback = cb;
    }),
    onHoverChange: vi.fn((cb: FakeObject['hoverCallback']) => {
      obj.hoverCallback = cb;
    }),
    interactCallback: () => {
      throw new Error('onInteract callback was not registered');
    },
    hoverCallback: () => {
      throw new Error('onHoverChange callback was not registered');
    },
  };
  return obj;
}

describe('input layer pointer and teardown', () => {
  let obj: FakeObject;
  let keyboard: { on: ReturnType<typeof vi.fn>; off: ReturnType<typeof vi.fn> };
  let input: InputPlugin;
  let clickHandler: ReturnType<typeof vi.fn>;
  let hoverHandler: ReturnType<typeof vi.fn>;
  let unsubscribeClick: () => void;
  let unsubscribeHover: () => void;

  beforeEach(() => {
    obj = fakeObject('a');
    keyboard = { on: vi.fn(), off: vi.fn() };
    input = { keyboard };
    clickHandler = vi.fn();
    hoverHandler = vi.fn();
    unsubscribeClick = phaserToReact.on('objectClick', clickHandler);
    unsubscribeHover = phaserToReact.on('objectHover', hoverHandler);
  });

  afterEach(() => {
    unsubscribeClick();
    unsubscribeHover();
  });

  it('emits objectClick with the object id when a click interaction fires', () => {
    createInputLayer(input, [obj] as unknown as SceneObject[]);

    obj.interactCallback({ objectId: 'a', actions: [] });

    expect(clickHandler).toHaveBeenCalledTimes(1);
    expect(clickHandler).toHaveBeenCalledWith({ id: 'a' });
  });

  it('emits objectHover with the id when the pointer enters and objectHover with null when it leaves', () => {
    createInputLayer(input, [obj] as unknown as SceneObject[]);

    obj.hoverCallback({ objectId: 'a', over: true });
    expect(hoverHandler).toHaveBeenLastCalledWith({ id: 'a' });

    obj.hoverCallback({ objectId: 'a', over: false });
    expect(hoverHandler).toHaveBeenLastCalledWith({ id: null });
    expect(hoverHandler).toHaveBeenCalledTimes(2);
  });

  it('after destroy, removes the keydown handler registered with keyboard.on and emits nothing for clicks, hovers or Escape', () => {
    const layer = createInputLayer(input, [obj] as unknown as SceneObject[]);

    expect(keyboard.on).toHaveBeenCalledWith('keydown', expect.any(Function));
    const keydownHandler = keyboard.on.mock.calls[0][1] as (e: KeyboardEvent) => void;

    layer.destroy();

    expect(keyboard.off).toHaveBeenCalledWith('keydown', keydownHandler);

    obj.interactCallback({ objectId: 'a', actions: [] });
    obj.hoverCallback({ objectId: 'a', over: true });
    keydownHandler(new KeyboardEvent('keydown', { key: 'Escape' }));

    expect(clickHandler).not.toHaveBeenCalled();
    expect(hoverHandler).not.toHaveBeenCalled();
  });

  it('a second destroy() call leaves keyboard.off called exactly once', () => {
    const layer = createInputLayer(input, [obj] as unknown as SceneObject[]);

    layer.destroy();
    layer.destroy();

    expect(keyboard.off).toHaveBeenCalledTimes(1);
  });
});
