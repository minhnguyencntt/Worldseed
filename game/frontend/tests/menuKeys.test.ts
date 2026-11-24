import { afterEach, describe, expect, it, vi } from 'vitest';
import { phaserToReact } from '../src/phaser/events';
import { handleMenuKey } from '../src/phaser/menuKeys';

describe('handleMenuKey', () => {
  let unsubscribe: (() => void) | undefined;

  afterEach(() => {
    unsubscribe?.();
    unsubscribe = undefined;
  });

  it('emits menuClose with an empty payload and returns true when Escape is pressed', () => {
    const handler = vi.fn();
    unsubscribe = phaserToReact.on('menuClose', handler);

    const handled = handleMenuKey('Escape');

    expect(handled).toBe(true);
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith({});
  });

  it('ignores other keys: returns false and does not emit menuClose', () => {
    const handler = vi.fn();
    unsubscribe = phaserToReact.on('menuClose', handler);

    handleMenuKey('Escape');
    const handled = handleMenuKey('Enter');

    expect(handled).toBe(false);
    expect(handler).toHaveBeenCalledTimes(1);
  });
});
