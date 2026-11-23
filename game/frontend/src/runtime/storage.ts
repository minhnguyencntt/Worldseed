import { deserializeState, serializeState } from '@game/state/persistence';
import type { GameState } from '@game/state/types';

export const STORAGE_KEY = 'worldseed:game-state:v1';

/**
 * Restores the saved game state. Returns null when nothing is saved, the storage is
 * unavailable, or the saved payload is corrupt. Never throws.
 */
export function readSaved(): GameState | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === null) {
      return null;
    }
    // deserializeState validates the root shape; the field types are checked at runtime
    // by the same validator, so the cast to the typed GameState is the intended contract.
    return deserializeState(raw) as unknown as GameState;
  } catch {
    return null;
  }
}

/**
 * Persists the game state. Returns false when storage is unavailable or the write fails.
 * Never throws.
 */
export function writeSaved(state: GameState): boolean {
  try {
    window.localStorage.setItem(STORAGE_KEY, serializeState(state as unknown as Parameters<typeof serializeState>[0]));
    return true;
  } catch {
    return false;
  }
}
