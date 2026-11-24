import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it, vi } from 'vitest';
import { createEventBus, type Unsubscribe } from '../src/phaser/events';

const eventsSource = readFileSync(resolve(__dirname, '../src/phaser/events.ts'), 'utf8');

describe('bridge type exports', () => {
  it('exports the Unsubscribe and EmptyPayload type names from events.ts', () => {
    // Given the source of events.ts
    // When it is read as text
    // Then both type names are declared as exports
    expect(eventsSource).toMatch(/export type Unsubscribe/);
    expect(eventsSource).toMatch(/export type EmptyPayload/);
  });

  it('returns an Unsubscribe from on() that stops delivery when called', () => {
    // Given a bus with one event and a handler subscribed through on()
    const bus = createEventBus<{ a: { n: number } }>();
    const handler = vi.fn();
    // The annotation is checked by the TypeScript compiler (npm run typecheck).
    const off: Unsubscribe = bus.on('a', handler);
    expect(typeof off).toBe('function');

    // When the returned unsubscribe is called and the event is emitted
    off();
    bus.emit('a', { n: 1 });

    // Then the handler is not called
    expect(handler).not.toHaveBeenCalled();
  });
});
