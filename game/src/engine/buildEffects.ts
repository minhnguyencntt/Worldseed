import type { SceneDef } from '../state/types';
import { layerDepth } from './layers';
import type { EffectHandle, EffectRenderContext } from './renderContext';

// Creates one handle per authored scene effect on the 'effects' layer.
// Transition specs are skipped here; they are played via ctx.playTransition.
export function buildEffects(ctx: EffectRenderContext, scene: SceneDef): EffectHandle[] {
  const depth = layerDepth('effects');
  return (scene.effects ?? [])
    .filter((spec) => spec.type !== 'transition')
    .map((spec) => ctx.createEffect({ ...spec, depth }));
}
