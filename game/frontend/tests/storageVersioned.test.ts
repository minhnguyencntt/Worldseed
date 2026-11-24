import { beforeEach, describe, expect, it, vi } from 'vitest';
import { readSaved, STORAGE_KEY, writeSaved } from '../src/runtime/storage';
import type { GameState } from '@game/state/types';

// The browser localStorage is the only mock: a Map-backed fake stands in for it.
function createFakeLocalStorage() {
  const map = new Map<string, string>();
  return {
    getItem: (key: string) => (map.has(key) ? (map.get(key) as string) : null),
    setItem: (key: string, value: string) => {
      map.set(key, String(value));
    },
    removeItem: (key: string) => {
      map.delete(key);
    },
    clear: () => map.clear(),
    key: (index: number) => Array.from(map.keys())[index] ?? null,
    get length() {
      return map.size;
    },
  };
}

const state: GameState = {
  currentScene: 'village',
  inventory: ['key'],
  discoveredObjects: ['well'],
  completedQuests: [],
  relationships: { guard: 2 },
  flags: { met_guard: true },
  history: ['intro'],
  activeDialogue: null,
};

describe('storage versioned', () => {
  let fake: ReturnType<typeof createFakeLocalStorage>;

  beforeEach(() => {
    fake = createFakeLocalStorage();
    vi.stubGlobal('localStorage', fake);
  });

  it('reads a legacy unversioned save (legacy)', () => {
    fake.setItem(STORAGE_KEY, JSON.stringify(state));

    expect(readSaved()).toEqual(state);
  });

  it('writes a versioned save and reads it back (versioned)', () => {
    expect(writeSaved(state)).toBe(true);
    expect(JSON.parse(fake.getItem(STORAGE_KEY) as string)).toEqual({ version: 1, state });
    expect(readSaved()).toEqual(state);
  });

  it('returns null for a bad save that is not JSON (bad: not json)', () => {
    fake.setItem(STORAGE_KEY, 'not json');

    expect(() => readSaved()).not.toThrow();
    expect(readSaved()).toBeNull();
  });

  it('returns null for a bad save with an unsupported version (bad: version 99)', () => {
    fake.setItem(STORAGE_KEY, JSON.stringify({ version: 99, state }));

    expect(() => readSaved()).not.toThrow();
    expect(readSaved()).toBeNull();
  });
});
