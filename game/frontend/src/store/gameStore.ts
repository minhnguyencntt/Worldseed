import { create } from 'zustand';
import type { GameState } from '@game/state/types';

export interface GameStoreState {
  state: GameState | null;
  focusedObjectId: string | null;
  setState: (updater: (prev: GameState) => GameState) => void;
  init: (s: GameState) => void;
  setFocusedObject: (id: string | null) => void;
}

/**
 * Shared game-state source of truth. `init` seeds the state once (no-op when already set);
 * `setState` applies an updater to the current non-null state (no-op before init).
 */
export const useGameStore = create<GameStoreState>()((set, get) => ({
  state: null,
  focusedObjectId: null,
  setState: (updater) => {
    const prev = get().state;
    if (prev === null) {
      return;
    }
    set({ state: updater(prev) });
  },
  init: (s) => {
    if (get().state === null) {
      set({ state: s });
    }
  },
  setFocusedObject: (id) => {
    set({ focusedObjectId: id });
  },
}));
