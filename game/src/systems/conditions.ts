import type { Condition, GameState } from '../state/types';

export function evaluateCondition(state: GameState, c: Condition): boolean {
  if ('hasItem' in c) {
    return state.inventory.includes(c.hasItem);
  }
  return state.flags[c.flag] === (c.equals ?? true);
}

export function evaluateAll(state: GameState, conds?: Condition[]): boolean {
  if (!conds || conds.length === 0) {
    return true;
  }
  return conds.every((c) => evaluateCondition(state, c));
}
