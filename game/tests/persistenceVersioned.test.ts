import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { serializeState, CURRENT_VERSION } from '../src/state/persistence';
import type { GameState } from '../src/state/types';

const persistenceSource = fileURLToPath(new URL('../src/state/persistence.ts', import.meta.url));

describe('serializeState envelope', () => {
  it('writes {version, state}', () => {
    // Given a GameState in the bedroom with a key and flag "a" set
    const state: GameState = {
      currentScene: 'bedroom',
      inventory: ['key'],
      discoveredObjects: [],
      completedQuests: [],
      relationships: {},
      flags: { a: true },
      history: [],
      activeDialogue: null,
    };

    // When it is serialized
    const result = serializeState(state);

    // Then the JSON is a versioned envelope around the same state
    expect(JSON.parse(result)).toEqual({ version: CURRENT_VERSION, state });
    expect(CURRENT_VERSION).toBe(1);
  });
});

describe('single GameState owner', () => {
  it('persistence imports GameState from ./types and does not declare it', () => {
    // Given the persistence module source on disk
    const source = readFileSync(persistenceSource, 'utf8');

    // Then it does not declare its own GameState type
    expect(source).not.toMatch(/(interface|type)\s+GameState/);

    // And it imports GameState from ./types
    expect(source).toMatch(/from '\.\/types'/);
  });
});
