import type { ObjectSpec } from '../content/schema';
import { layerDepth } from '../engine/layers';
import type { RenderContext, RenderHandle } from '../engine/renderContext';
import { evaluateAll } from '../systems/conditions';
import type { GameState } from '../state/types';

// Wraps one authored ObjectSpec and the render handle that draws it.
export class SceneObject {
  readonly spec: ObjectSpec;
  readonly depth: number;
  private handle: RenderHandle;

  constructor(spec: ObjectSpec, ctx: RenderContext) {
    this.spec = spec;
    this.depth = layerDepth(spec.layer);
    this.handle = ctx.createSprite({
      key: spec.asset,
      x: spec.position.x,
      y: spec.position.y,
      scale: spec.scale,
      depth: this.depth,
    });
  }

  sync(state: GameState): void {
    this.handle.setVisible(evaluateAll(state, this.spec.visibleWhen));
  }

  destroy(): void {
    this.handle.destroy();
  }
}
