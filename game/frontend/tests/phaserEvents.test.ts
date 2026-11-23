import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it, vi } from 'vitest';
import { phaserToReact, reactToPhaser } from '../src/phaser/events';

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
