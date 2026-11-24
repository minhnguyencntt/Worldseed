import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { SceneObject } from '@game/entities/SceneObject';
import { createEventBus, phaserToReact } from '../src/phaser/events';
import { createInputLayer, type InputPlugin } from '../src/phaser/input';
import { useGameStore } from '../src/store/gameStore';

// REQ1: hover and focus paths reuse their payload objects and the bus reuses its handler
// snapshot, so no per-emit allocation is needed. Pure fakes only; no Phaser is loaded.

describe('createEventBus handler snapshot reuse', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('emit reuses the handler snapshot: Array.from runs once across two emits and both handlers run twice', () => {
    const bus = createEventBus<{ ping: { n: number } }>();
    const first = vi.fn();
    const second = vi.fn();
    bus.on('ping', first);
    bus.on('ping', second);

    const fromSpy = vi.spyOn(Array, 'from');

    bus.emit('ping', { n: 1 });
    bus.emit('ping', { n: 2 });

    expect(fromSpy).toHaveBeenCalledTimes(1);
    expect(first).toHaveBeenCalledTimes(2);
    expect(second).toHaveBeenCalledTimes(2);
    expect(first).toHaveBeenNthCalledWith(2, { n: 2 });
  });

  it('handler added during emit runs on the next emit only', () => {
    const bus = createEventBus<{ ping: { n: number } }>();
    const late = vi.fn();
    let subscribed = false;
    bus.on('ping', () => {
      if (!subscribed) {
        subscribed = true;
        bus.on('ping', late);
      }
    });

    bus.emit('ping', { n: 1 });
    expect(late).not.toHaveBeenCalled();

    bus.emit('ping', { n: 2 });
    expect(late).toHaveBeenCalledTimes(1);
    expect(late).toHaveBeenCalledWith({ n: 2 });
  });
});

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

describe('input layer payload reuse', () => {
  beforeEach(() => {
    useGameStore.getState().setFocusedObject(null);
  });

  afterEach(() => {
    useGameStore.getState().setFocusedObject(null);
  });

  it('input layer reuses payloads: focusChange hands the same object with the changed id across two moveFocus calls', () => {
    const keyboard = { on: vi.fn(), off: vi.fn() };
    const input: InputPlugin = { keyboard };
    const objects = [fakeObject('a'), fakeObject('b')];
    const layer = createInputLayer(input, objects as unknown as SceneObject[]);

    const received: Array<{ ref: { id: string | null }; id: string | null }> = [];
    const unsubscribe = phaserToReact.on('focusChange', (payload) => {
      received.push({ ref: payload as { id: string | null }, id: payload.id });
    });

    try {
      layer.moveFocus(1);
      layer.moveFocus(1);
    } finally {
      unsubscribe();
      layer.destroy();
    }

    expect(received).toHaveLength(2);
    expect(received[0].id).toBe('a');
    expect(received[1].id).toBe('b');
    // Same payload object on every emit; only its id changes.
    expect(received[1].ref).toBe(received[0].ref);
    expect(received[0].ref.id).toBe('b');
  });
});
