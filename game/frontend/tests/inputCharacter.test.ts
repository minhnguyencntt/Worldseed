import { describe, expect, it, vi } from 'vitest';
import { createInputLayer, type PointerTarget } from '../src/phaser/input';
import { phaserToReact } from '../src/phaser/events';

// A fake pointer target records each pointerdown listener so the test can invoke it the way Phaser would.
function fakePointerTarget() {
  const handlers = new Map<string, () => void>();
  const target = {
    on: vi.fn((event: 'pointerdown', fn: () => void) => {
      handlers.set(event, fn);
      return target;
    }),
    off: vi.fn((_event: 'pointerdown', _fn: () => void) => target),
  };
  const fire = (): void => {
    const fn = handlers.get('pointerdown');
    if (!fn) throw new Error('no pointerdown listener registered');
    fn();
  };
  return { target: target as unknown as PointerTarget & typeof target, fire };
}

describe('input layer bindCharacter', () => {
  it('emits characterClick with the character id and calls onDown once on pointerdown', () => {
    // Given an input layer with no keyboard and a fake pointer target bound to character 'npc'
    const layer = createInputLayer({ keyboard: null }, []);
    const { target, fire } = fakePointerTarget();
    const onDown = vi.fn();
    const seen: Array<{ id: string }> = [];
    const unsubscribe = phaserToReact.on('characterClick', (payload) => seen.push(payload));
    try {
      layer.bindCharacter(target, 'npc', onDown);
      // When the target receives pointerdown
      fire();
      // Then a characterClick subscriber gets { id: 'npc' } and onDown is called once
      expect(seen).toEqual([{ id: 'npc' }]);
      expect(onDown).toHaveBeenCalledTimes(1);
    } finally {
      unsubscribe();
      layer.destroy();
    }
  });

  it('releases the pointerdown listener on destroy so pressing the target emits nothing', () => {
    // Given a character bound to the layer
    const layer = createInputLayer({ keyboard: null }, []);
    const { target, fire } = fakePointerTarget();
    const onDown = vi.fn();
    const seen: Array<{ id: string }> = [];
    const unsubscribe = phaserToReact.on('characterClick', (payload) => seen.push(payload));
    try {
      layer.bindCharacter(target, 'npc', onDown);
      const registered = (target.on as unknown as ReturnType<typeof vi.fn>).mock.calls[0]![1];
      // When the layer is destroyed
      layer.destroy();
      // Then the target is detached with the same function it attached
      expect(target.off).toHaveBeenCalledWith('pointerdown', registered);
      // And invoking that listener afterwards emits nothing and does not call onDown
      fire();
      expect(seen).toEqual([]);
      expect(onDown).not.toHaveBeenCalled();
    } finally {
      unsubscribe();
    }
  });
});
