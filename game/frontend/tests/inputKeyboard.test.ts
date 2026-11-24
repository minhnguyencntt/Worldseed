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

type KeyHandler = (e: KeyboardEvent) => void;

// Captures the keydown handler the input layer registered on the mocked plugin keyboard.
function keyHandlerFrom(keyboard: { on: ReturnType<typeof vi.fn> }): KeyHandler {
  const handler = keyboard.on.mock.calls[0]?.[1] as KeyHandler | undefined;
  if (typeof handler !== 'function') {
    throw new Error("input layer did not register a 'keydown' handler on input.keyboard");
  }
  return handler;
}

function press(handler: KeyHandler, key: string, shiftKey = false) {
  const event = { key, shiftKey, preventDefault: vi.fn() };
  handler(event as unknown as KeyboardEvent);
  return event;
}

describe('input layer keyboard', () => {
  let objects: FakeObject[];
  let keyboard: { on: ReturnType<typeof vi.fn>; off: ReturnType<typeof vi.fn> };
  let input: InputPlugin;
  let handler: KeyHandler;

  beforeEach(() => {
    useGameStore.getState().setFocusedObject(null);
    objects = [fakeObject('a'), fakeObject('b')];
    keyboard = { on: vi.fn(), off: vi.fn() };
    input = { keyboard };
    createInputLayer(input, objects as unknown as SceneObject[]);
    handler = keyHandlerFrom(keyboard);
  });

  afterEach(() => {
    useGameStore.getState().setFocusedObject(null);
  });

  it('Tab with nothing focused focuses the first object and calls preventDefault', () => {
    const event = press(handler, 'Tab');

    expect(objects[0].isFocused).toBe(true);
    expect(objects[1].isFocused).toBe(false);
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('Shift+Tab moves focus back by one object', () => {
    objects[1].focus();

    const event = press(handler, 'Tab', true);

    expect(objects[0].isFocused).toBe(true);
    expect(objects[1].isFocused).toBe(false);
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('ArrowLeft and ArrowUp move focus back by one object', () => {
    objects[1].focus();

    const left = press(handler, 'ArrowLeft');
    expect(objects[0].isFocused).toBe(true);
    expect(left.preventDefault).toHaveBeenCalled();

    objects[0].blur();
    objects[1].focus();

    const up = press(handler, 'ArrowUp');
    expect(objects[0].isFocused).toBe(true);
    expect(up.preventDefault).toHaveBeenCalled();
  });

  it('ArrowRight and ArrowDown move focus forward by one object', () => {
    objects[0].focus();

    const right = press(handler, 'ArrowRight');
    expect(objects[1].isFocused).toBe(true);
    expect(objects[0].isFocused).toBe(false);
    expect(right.preventDefault).toHaveBeenCalled();

    objects[1].blur();
    objects[0].focus();

    const down = press(handler, 'ArrowDown');
    expect(objects[1].isFocused).toBe(true);
    expect(objects[0].isFocused).toBe(false);
    expect(down.preventDefault).toHaveBeenCalled();
  });

  it('Enter calls handleKey with "Enter" on each object', () => {
    press(handler, 'Enter');

    expect(objects[0].handleKey).toHaveBeenCalledWith('Enter');
    expect(objects[1].handleKey).toHaveBeenCalledWith('Enter');
  });

  it('Space calls handleKey with " " on each object', () => {
    press(handler, ' ');

    expect(objects[0].handleKey).toHaveBeenCalledWith(' ');
    expect(objects[1].handleKey).toHaveBeenCalledWith(' ');
  });

  it("Escape notifies 'menuClose' subscribers with an empty payload", () => {
    const received = vi.fn();
    const unsubscribe = phaserToReact.on('menuClose', received);

    try {
      press(handler, 'Escape');
    } finally {
      unsubscribe();
    }

    expect(received).toHaveBeenCalledTimes(1);
    expect(received).toHaveBeenCalledWith({});
  });

  it('createInputLayer does not throw when the plugin has no keyboard', () => {
    const objs = [fakeObject('a'), fakeObject('b')] as unknown as SceneObject[];

    expect(() => createInputLayer({}, objs)).not.toThrow();
    expect(() => createInputLayer({ keyboard: undefined }, objs)).not.toThrow();
  });
});
