import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it, vi } from 'vitest';
import {
  createEventBus,
  phaserToReact,
  reactToPhaser,
  type PhaserToReactEvents,
} from '../src/phaser/events';

describe('typed event bus delivery', () => {
  it('delivers a phaser-to-react event payload to a subscribed handler exactly once', () => {
    // Given a handler subscribed to objectClick on the phaser-to-react bus
    const fn = vi.fn();
    const unsubscribe = phaserToReact.on('objectClick', fn);

    // When objectClick is emitted with a payload
    phaserToReact.emit('objectClick', { id: 'bookshelf' });

    // Then the handler is called once with that exact payload
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith({ id: 'bookshelf' });

    unsubscribe();
    phaserToReact.clear();
  });

  it('stops delivering events after the returned unsubscribe function is called', () => {
    // Given a handler subscribed to objectClick and the first emit already delivered
    const fn = vi.fn();
    const unsubscribe = phaserToReact.on('objectClick', fn);
    phaserToReact.emit('objectClick', { id: 'bookshelf' });

    // When the unsubscribe function is called and objectClick is emitted again
    unsubscribe();
    phaserToReact.emit('objectClick', { id: 'bookshelf' });

    // Then the handler is still called only once
    expect(fn).toHaveBeenCalledTimes(1);

    phaserToReact.clear();
  });

  it('delivers characterClick payload once and not to objectClick handlers', () => {
    // Given a characterClick handler and an objectClick handler on the phaser-to-react bus
    const characterHandler = vi.fn();
    const objectHandler = vi.fn();
    const unsubscribeCharacter = phaserToReact.on('characterClick', characterHandler);
    const unsubscribeObject = phaserToReact.on('objectClick', objectHandler);

    // When characterClick is emitted with { id: 'boy' }
    phaserToReact.emit('characterClick', { id: 'boy' });

    // Then the characterClick handler is called once with that payload and the objectClick handler is not called
    expect(characterHandler).toHaveBeenCalledTimes(1);
    expect(characterHandler).toHaveBeenCalledWith({ id: 'boy' });
    expect(objectHandler).not.toHaveBeenCalled();

    unsubscribeCharacter();
    unsubscribeObject();
    phaserToReact.clear();
  });

  it('delivers no events to react-to-phaser handlers after clear is called', () => {
    // Given a handler subscribed to transitionTo on the react-to-phaser bus
    const fn = vi.fn();
    reactToPhaser.on('transitionTo', fn);

    // When the bus is cleared and transitionTo is emitted
    reactToPhaser.clear();
    reactToPhaser.emit('transitionTo', { sceneId: 'library' });

    // Then no handler is called
    expect(fn).not.toHaveBeenCalled();
  });

  it('keeps the event bus free of any direct phaser import', () => {
    // Given the event bus source file on disk
    const source = readFileSync(resolve(process.cwd(), 'src/phaser/events.ts'), 'utf8');

    // Then it does not import from 'phaser' directly
    expect(source).not.toContain("from 'phaser'");
  });
});

describe('phaserToReact keyboard events', () => {
  it('delivers focusChange payload to a subscribed handler', () => {
    // Given a handler subscribed to focusChange on the phaser-to-react bus
    const fn = vi.fn();
    const unsubscribe = phaserToReact.on('focusChange', fn);

    // When focusChange is emitted with a focused object id
    phaserToReact.emit('focusChange', { id: 'bookshelf' });

    // Then the handler is called with that exact payload
    expect(fn).toHaveBeenCalledWith({ id: 'bookshelf' });

    unsubscribe();
    phaserToReact.clear();
  });

  it('menuClose unsubscribes: no delivery after the returned unsubscribe is called', () => {
    // Given a handler subscribed to menuClose and the first emit already delivered
    const fn = vi.fn();
    const unsubscribe = phaserToReact.on('menuClose', fn);
    phaserToReact.emit('menuClose', {});

    // When the unsubscribe function is called and menuClose is emitted again
    unsubscribe();
    phaserToReact.emit('menuClose', {});

    // Then the handler has been called only once
    expect(fn).toHaveBeenCalledTimes(1);

    phaserToReact.clear();
  });
});

describe('bus operations', () => {
  it('off removes a handler so a later emit does not call it', () => {
    // Given a handler subscribed to objectClick on a fresh bus
    const bus = createEventBus<PhaserToReactEvents>();
    const fn = vi.fn();
    bus.on('objectClick', fn);

    // When the same handler is removed with off and objectClick is emitted
    bus.off('objectClick', fn);
    bus.emit('objectClick', { id: 'x' });

    // Then the handler is not called
    expect(fn).not.toHaveBeenCalled();

    bus.clear();
  });

  it('emit on an empty bus does not throw', () => {
    // Given a bus with no handlers
    const bus = createEventBus<PhaserToReactEvents>();

    // When objectClick is emitted
    // Then emit completes without throwing
    expect(() => bus.emit('objectClick', { id: 'x' })).not.toThrow();

    bus.clear();
  });

  it('delivers the same payload to every subscribed handler', () => {
    // Given two handlers subscribed to objectClick
    const bus = createEventBus<PhaserToReactEvents>();
    const first = vi.fn();
    const second = vi.fn();
    bus.on('objectClick', first);
    bus.on('objectClick', second);

    // When objectClick is emitted with { id: 'x' }
    bus.emit('objectClick', { id: 'x' });

    // Then both handlers are called with that payload
    expect(first).toHaveBeenCalledWith({ id: 'x' });
    expect(second).toHaveBeenCalledWith({ id: 'x' });

    bus.clear();
  });

  it('a handler that unsubscribes itself during emit does not stop the next handler', () => {
    // Given a first handler that unsubscribes itself, and a second handler
    const bus = createEventBus<PhaserToReactEvents>();
    const second = vi.fn();
    let unsubscribeFirst: () => void = () => {};
    unsubscribeFirst = bus.on('objectClick', () => {
      unsubscribeFirst();
    });
    bus.on('objectClick', second);

    // When objectClick is emitted
    bus.emit('objectClick', { id: 'x' });

    // Then the second handler is still called once
    expect(second).toHaveBeenCalledTimes(1);

    bus.clear();
  });

  it('events emitted on phaserToReact are not delivered to reactToPhaser handlers', () => {
    // Given a handler subscribed to objectClick on phaserToReact
    const phaserHandler = vi.fn();
    phaserToReact.on('objectClick', phaserHandler);

    // Given a handler subscribed to transitionTo on reactToPhaser
    const reactHandler = vi.fn();
    reactToPhaser.on('transitionTo', reactHandler);

    // When transitionTo is emitted on reactToPhaser
    reactToPhaser.emit('transitionTo', { sceneId: 'a' });

    // Then the phaserToReact objectClick handler is not called
    expect(phaserHandler).not.toHaveBeenCalled();
    // And the reactToPhaser handler receives it
    expect(reactHandler).toHaveBeenCalledWith({ sceneId: 'a' });

    phaserToReact.clear();
    reactToPhaser.clear();
  });
});
