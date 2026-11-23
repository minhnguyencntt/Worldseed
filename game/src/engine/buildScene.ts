import type { SceneSpec } from '../content/schema';
import { SceneObject } from '../entities/SceneObject';
import { nextFocusIndex } from '../systems/interaction';
import type { RenderContext } from './renderContext';

export function buildScene(ctx: RenderContext, scene: SceneSpec): SceneObject[] {
  return scene.objects.map((o) => new SceneObject(o, ctx)).sort((a, b) => a.depth - b.depth);
}

// Moves keyboard focus one step forward (delta 1) or backward (delta -1) through the objects,
// wrapping at either end and skipping hidden objects. Focus is cleared when no object is visible.
export function moveFocus(objs: SceneObject[], delta: 1 | -1): void {
  const n = objs.length;
  const current = objs.findIndex((o) => o.isFocused);
  // Start one step before the first object when nothing is focused, so the first step lands on it.
  let idx = current === -1 ? (delta === 1 ? -1 : n) : current;
  let target = -1;
  for (let step = 0; step < n; step++) {
    idx = nextFocusIndex(n, idx, delta);
    if (objs[idx].isVisible) {
      target = idx;
      break;
    }
  }
  objs.forEach((o, i) => {
    if (i === target) o.focus();
    else if (o.isFocused) o.blur();
  });
}
