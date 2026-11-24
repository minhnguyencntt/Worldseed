import { describe, it, expect } from 'vitest';
import { serializeState, deserializeState, migrate, CURRENT_VERSION } from '../src/state/persistence';
import type { GameState } from '../src/state/types';

const s: GameState = {
  currentScene: 'bedroom',
  inventory: ['key'],
  discoveredObjects: ['bookshelf'],
  completedQuests: [],
  relationships: { guard: 2 },
  flags: { a: true },
  history: ['start'],
  activeDialogue: null,
};

describe('persistence migration: round trip and legacy', () => {
  it('round trip: deserializeState(serializeState(s)) equals s', () => {
    // Given a valid game state
    // When it is serialized and deserialized again
    const restored = deserializeState(serializeState(s));
    // Then the restored state equals the original
    expect(restored).toEqual(s);
  });

  it('legacy: a save without a version field loads as the current state', () => {
    // Given a legacy save written as the bare state with no version field
    const legacy = JSON.stringify(s);
    // When it is deserialized
    // Then it loads and equals the original state
    expect(deserializeState(legacy)).toEqual(s);
  });
});

describe('persistence migration: corrupt and future saves', () => {
  it('corrupt: text that is not JSON throws', () => {
    expect(() => deserializeState('not json')).toThrow();
  });

  it('corrupt: an empty object throws', () => {
    expect(() => deserializeState('{}')).toThrow();
  });

  it('corrupt: a version 1 save with a non-boolean flag throws', () => {
    // Given a version 1 envelope whose flags contain a string value
    const corrupt = JSON.stringify({ version: 1, state: { ...s, flags: { a: 'x' } } });
    // Then deserializing it throws
    expect(() => deserializeState(corrupt)).toThrow();
  });

  it('future: a save one version newer than current is rejected', () => {
    // Given a save stamped with the next unsupported version
    const future = JSON.stringify({ version: CURRENT_VERSION + 1, state: s });
    // Then deserializing it throws the unsupported-version error
    expect(() => deserializeState(future)).toThrow(/Unsupported save version/);
  });

  it('future: migrate rejects version 2 envelopes', () => {
    expect(() => migrate({ version: 2, state: s })).toThrow();
  });

  it('migrate passes an unversioned state through unchanged', () => {
    expect(migrate(s)).toEqual(s);
  });
});
