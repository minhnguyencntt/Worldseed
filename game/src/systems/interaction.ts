import type { ActionSpec, ObjectSpec } from '../content/schema';
import type { GameState } from '../state/types';
import { evaluateAll } from './conditions';

// True when the point (px, py) lies inside the object's scaled interaction bounds.
// Left/top edges are inclusive, right/bottom edges exclusive.
export function pointInBounds(spec: ObjectSpec, px: number, py: number): boolean {
  const b = spec.interactionBounds;
  if (!b) return false;
  const x0 = spec.position.x + b.x * spec.scale;
  const y0 = spec.position.y + b.y * spec.scale;
  return px >= x0 && px < x0 + b.width * spec.scale && py >= y0 && py < y0 + b.height * spec.scale;
}

// Actions whose conditions currently pass for the given state.
export function availableActions(state: GameState, spec: ObjectSpec): ActionSpec[] {
  return spec.actions.filter((a) => evaluateAll(state, a.conditions));
}

// Keys that activate the focused control.
export function isActivationKey(key: string): boolean {
  return key === 'Enter' || key === ' ';
}

// Next focus index, wrapping in both directions; -1 when there is nothing to focus.
export function nextFocusIndex(count: number, current: number, delta: 1 | -1): number {
  if (count <= 0) return -1;
  return (((current + delta) % count) + count) % count;
}
