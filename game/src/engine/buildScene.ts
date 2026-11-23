import type { SceneSpec } from '../content/schema';
import { SceneObject } from '../entities/SceneObject';
import type { RenderContext } from './renderContext';

export function buildScene(ctx: RenderContext, scene: SceneSpec): SceneObject[] {
  return scene.objects.map((o) => new SceneObject(o, ctx)).sort((a, b) => a.depth - b.depth);
}
