import type { GameState } from '../state/types';

export function addItem(state: GameState, item: string): GameState {
  if (state.inventory.includes(item)) {
    return state;
  }
  return { ...state, inventory: [...state.inventory, item] };
}

export function removeItem(state: GameState, item: string): GameState {
  return { ...state, inventory: state.inventory.filter((i) => i !== item) };
}

export function hasItem(state: GameState, item: string): boolean {
  return state.inventory.includes(item);
}
