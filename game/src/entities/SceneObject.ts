import type { ActionSpec, ObjectSpec } from '../content/schema';
import { layerDepth } from '../engine/layers';
import type { RenderContext, RenderHandle } from '../engine/renderContext';
import { evaluateAll } from '../systems/conditions';
import type { GameState } from '../state/types';

// Actions whose conditions currently hold for the given state.
function availableActions(state: GameState, spec: ObjectSpec): ActionSpec[] {
  return spec.actions.filter((a) => evaluateAll(state, a.conditions));
}

// Wraps one authored ObjectSpec and the render handle that draws it.
export class SceneObject {
  readonly spec: ObjectSpec;
  readonly depth: number;
  private handle: RenderHandle;
  private visible = true;
  private lastState?: GameState;
  private listener?: (e: { objectId: string; actions: ActionSpec[] }) => void;

  constructor(spec: ObjectSpec, ctx: RenderContext) {
    this.spec = spec;
    this.depth = layerDepth(spec.layer);
    this.handle = ctx.createSprite({
      key: spec.asset,
      x: spec.position.x,
      y: spec.position.y,
      scale: spec.scale,
      depth: this.depth,
      label: spec.name,
      bounds: spec.interactionBounds,
    });
    this.handle.onHover((over) => {
      if (!this.visible) return;
      this.handle.setHighlighted(over);
      this.handle.setLabelVisible(over);
    });
    this.handle.onClick(() => this.activate());
  }

  sync(state: GameState): void {
    this.lastState = state;
    this.visible = evaluateAll(state, this.spec.visibleWhen);
    this.handle.setVisible(this.visible);
    if (!this.visible) {
      this.handle.setHighlighted(false);
      this.handle.setLabelVisible(false);
    }
  }

  onInteract(cb: (e: { objectId: string; actions: ActionSpec[] }) => void): void {
    this.listener = cb;
  }

  private activate(): void {
    if (!this.visible || !this.lastState || !this.listener) return;
    this.listener({ objectId: this.spec.id, actions: availableActions(this.lastState, this.spec) });
  }

  destroy(): void {
    this.handle.destroy();
  }
}
