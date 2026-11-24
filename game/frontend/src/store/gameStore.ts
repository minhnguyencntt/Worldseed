import { create } from 'zustand';
import { createInitialState } from '@game/state/gameState';
import type { GameState } from '@game/state/types';
import { scene, world } from '../runtime/content';
import { readSaved, writeSaved } from '../runtime/storage';

export interface GameStoreState {
  state: GameState | null;
  focusedObjectId: string | null;
  setState: (updater: (prev: GameState) => GameState) => void;
  init: (s: GameState) => void;
  hydrate: () => void;
  setFocusedObject: (id: string | null) => void;
}

/**
 * Shared game-state source of truth. `init` seeds the state once (no-op when already set);
 * `setState` applies an updater to the current non-null state (no-op before init).
 * `hydrate` replaces the state with the saved state or a fresh initial state. Every state
 * change written through `setState` or `hydrate` is persisted via runtime/storage.
 */
export const useGameStore = create<GameStoreState>()((set, get) => ({
  state: null,
  focusedObjectId: null,
  setState: (updater) => {
    const prev = get().state;
    if (prev === null) {
      return;
    }
    const next = updater(prev);
    set({ state: next });
    writeSaved(next);
  },
  init: (s) => {
    if (get().state === null) {
      set({ state: s });
    }
  },
  hydrate: () => {
    const next = readSaved() ?? createInitialState(world, scene);
    set({ state: next });
    writeSaved(next);
  },
  setFocusedObject: (id) => {
    set({ focusedObjectId: id });
  },
}));
