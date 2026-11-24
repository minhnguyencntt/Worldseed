import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { SceneObject } from '@game/entities/SceneObject';
import { createInputLayer, type InputPlugin } from '../src/phaser/input';
import { phaserToReact } from '../src/phaser/events';
import { useGameStore } from '../src/store/gameStore';

// Fake SceneObject: only the members input.ts and moveFocus touch. buildScene is NOT mocked,
// so moveFocus runs for real over these fakes.
interface FakeObject {
  spec: { id: string };
  isVisible: boolean;
  isFocused: boolean;
  focus: () => void;
  blur: () => void;
  handleKey: ReturnType<typeof vi.fn>;
  onInteract: ReturnType<typeof vi.fn>;
  onHoverChange: ReturnType<typeof vi.fn>;
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
    handleKey: vi.fn(),
    onInteract: vi.fn(),
    onHoverChange: vi.fn(),
  };
  return obj;
}

function fakeInput(): InputPlugin {
  return { keyboard: { on: vi.fn(), off: vi.fn() } };
}

describe('input layer focus', () => {
  let objects: FakeObject[];
  let handler: ReturnType<typeof vi.fn>;
  let unsubscribe: () => void;

  beforeEach(() => {
    useGameStore.getState().setFocusedObject(null);
    objects = [fakeObject('a'), fakeObject('b'), fakeObject('c')];
    handler = vi.fn();
    unsubscribe = phaserToReact.on('focusChange', handler);
  });

  afterEach(() => {
    unsubscribe();
    useGameStore.getState().setFocusedObject(null);
  });

  it('moveFocus(1) from no focus focuses the first object, publishes it to the store and emits focusChange', () => {
    const layer = createInputLayer(fakeInput(), objects as unknown as SceneObject[]);

    const result = layer.moveFocus(1);

    expect(result).toBe('a');
    expect(useGameStore.getState().focusedObjectId).toBe('a');
    expect(handler).toHaveBeenCalledWith({ id: 'a' });
  });

  it('focusObject(null) blurs every object, clears the store and emits focusChange with a null id', () => {
    const layer = createInputLayer(fakeInput(), objects as unknown as SceneObject[]);
    layer.focusObject('a');
    handler.mockClear();

    layer.focusObject(null);

    expect(objects.every((o) => o.isFocused === false)).toBe(true);
    expect(useGameStore.getState().focusedObjectId).toBeNull();
    expect(handler).toHaveBeenCalledWith({ id: null });
  });

  it('moveFocus(-1) from focused "a" wraps around to "c"', () => {
    const layer = createInputLayer(fakeInput(), objects as unknown as SceneObject[]);
    layer.focusObject('a');

    const result = layer.moveFocus(-1);

    expect(result).toBe('c');
    expect(layer.focusedId()).toBe('c');
    expect(objects.filter((o) => o.isFocused).map((o) => o.spec.id)).toEqual(['c']);
  });

  it('focusObject("b") focuses only object "b"', () => {
    const layer = createInputLayer(fakeInput(), objects as unknown as SceneObject[]);

    layer.focusObject('b');

    expect(objects.map((o) => [o.spec.id, o.isFocused])).toEqual([
      ['a', false],
      ['b', true],
      ['c', false],
    ]);
    expect(layer.focusedId()).toBe('b');
    expect(useGameStore.getState().focusedObjectId).toBe('b');
  });
});
