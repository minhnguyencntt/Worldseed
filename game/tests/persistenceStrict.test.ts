import { describe, expect, it } from 'vitest';
import { deserializeState, serializeState } from '../src/state/persistence';
import type { GameState } from '../src/state/types';

// Builds a valid saved payload with the secret door flag set, then lets each test corrupt one field.
function validPayload(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    currentScene: 'bedroom',
    inventory: [],
    discoveredObjects: [],
    completedQuests: [],
    history: [],
    flags: { secret_door_open: true },
    relationships: {},
    activeDialogue: null,
    ...overrides,
  };
}

describe('deserializeState element validation', () => {
  it('keeps flags.secret_door_open true across a serialize/deserialize round trip', () => {
    // Given a state where the bookshelf has opened the secret door
    const original: GameState = {
      currentScene: 'bedroom',
      inventory: [],
      discoveredObjects: [],
      completedQuests: [],
      history: [],
      relationships: {},
      flags: { secret_door_open: true },
      activeDialogue: null,
    };

    // When it is serialized and read back
    const restored = deserializeState(serializeState(original));

    // Then the secret door flag is still true
    expect(restored.flags.secret_door_open).toBe(true);
  });

  it('rejects an inventory that contains non-string elements with "Invalid game state: inventory"', () => {
    // Given a save whose inventory holds a number
    const json = JSON.stringify(validPayload({ inventory: [1] }));

    // When it is deserialized
    // Then it is rejected with the inventory error
    expect(() => deserializeState(json)).toThrow('Invalid game state: inventory');
  });

  it('rejects flags with non-boolean values', () => {
    // Given a save whose flag value is a string
    const json = JSON.stringify(validPayload({ flags: { a: 'x' } }));

    // When it is deserialized
    // Then it is rejected
    expect(() => deserializeState(json)).toThrow('Invalid game state: flags');
  });

  it('rejects relationships with non-number values', () => {
    // Given a save whose relationship value is a string
    const json = JSON.stringify(validPayload({ relationships: { a: 'x' } }));

    // When it is deserialized
    // Then it is rejected
    expect(() => deserializeState(json)).toThrow('Invalid game state: relationships');
  });
});
