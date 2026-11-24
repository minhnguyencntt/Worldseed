// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createInitialState } from '@game/state/gameState';
import { useGameStore } from '../src/store/gameStore';
import { STORAGE_KEY, writeSaved } from '../src/runtime/storage';
import { scene, world } from '../src/runtime/content';

// The browser localStorage is the only external dependency: a Map-backed fake stands in for it.
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

describe('gameStore persistence', () => {
  let fake: ReturnType<typeof createFakeLocalStorage>;

  beforeEach(() => {
    fake = createFakeLocalStorage();
    vi.stubGlobal('localStorage', fake);
    localStorage.clear();
    useGameStore.setState({ state: null });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('hydrate restores a valid save', () => {
    writeSaved({ ...createInitialState(world, scene), inventory: ['key'] });

    useGameStore.getState().hydrate();

    expect(useGameStore.getState().state?.inventory).toEqual(['key']);
  });

  it('hydrate starts fresh on missing or corrupt save', () => {
    const initial = createInitialState(world, scene);

    // Missing save: nothing in storage.
    useGameStore.getState().hydrate();
    expect(useGameStore.getState().state).toEqual(initial);

    // Corrupt save: unparseable payload under the storage key.
    useGameStore.setState({ state: null });
    localStorage.setItem(STORAGE_KEY, '{bad');
    useGameStore.getState().hydrate();
    expect(useGameStore.getState().state).toEqual(initial);
  });

  it('setState saves and survives a failing storage', () => {
    useGameStore.getState().hydrate();

    useGameStore.getState().setState((prev) => ({
      ...prev,
      inventory: [...prev.inventory, 'rope'],
    }));

    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) as string);
    expect(saved.state.inventory).toContain('rope');
    expect(saved.version).toBe(1);

    // Adapted from the step's Storage.prototype spy: localStorage is the Map-backed fake here,
    // so the failing write is injected on the fake's setItem.
    vi.spyOn(fake, 'setItem').mockImplementation(() => {
      throw new Error('quota');
    });

    expect(() =>
      useGameStore.getState().setState((prev) => ({
        ...prev,
        inventory: [...prev.inventory, 'lamp'],
      })),
    ).not.toThrow();
    expect(useGameStore.getState().state?.inventory).toEqual(['rope', 'lamp']);
  });
});
