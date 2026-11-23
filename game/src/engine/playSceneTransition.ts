import type { SceneDef } from '../state/types';
import type { EffectRenderContext } from './renderContext';

export function playSceneTransition(ctx: EffectRenderContext, scene: SceneDef): void {
  const spec = (scene.effects ?? []).find((e) => e.type === 'transition');
  if (spec && spec.type === 'transition') ctx.playTransition(spec.durationMs);
}
