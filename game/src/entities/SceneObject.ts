import type { ActionSpec, ObjectSpec } from '../content/schema';
import { layerDepth } from '../engine/layers';
import type { RenderContext, RenderHandle } from '../engine/renderContext';
import { evaluateAll } from '../systems/conditions';
import { availableActions, isActivationKey } from '../systems/interaction';
import type { GameState } from '../state/types';

// Wraps one authored ObjectSpec and the render handle that draws it.
export class SceneObject {
  readonly spec: ObjectSpec;
  readonly depth: number;
  private handle: RenderHandle;
  private visible = true;
  private focused = false;
  private lastState?: GameState;
  private listener?: (e: { objectId: string; actions: ActionSpec[] }) => void;
  private hoverListener?: (e: { objectId: string; over: boolean }) => void;

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
      this.hoverListener?.({ objectId: this.spec.id, over });
    });
    this.handle.onClick(() => this.activate());
  }

  sync(state: GameState): void {
    this.lastState = state;
    this.visible = evaluateAll(state, this.spec.visibleWhen);
    this.handle.setVisible(this.visible);
    if (!this.visible) {
      this.focused = false;
      this.handle.setHighlighted(false);
      this.handle.setLabelVisible(false);
    }
  }

  get isVisible(): boolean {
    return this.visible;
  }

  get isFocused(): boolean {
    return this.focused;
  }

  // Keyboard focus: only a visible object can take focus; it shows the same highlight and label as hover.
  focus(): void {
    if (!this.visible) return;
    this.focused = true;
    this.handle.setHighlighted(true);
    this.handle.setLabelVisible(true);
  }

  blur(): void {
    this.focused = false;
    this.handle.setHighlighted(false);
    this.handle.setLabelVisible(false);
  }

  // Enter or Space activates the object, but only while it holds keyboard focus.
  handleKey(key: string): void {
    if (!this.focused || !isActivationKey(key)) return;
    this.activate();
  }

  onInteract(cb: (e: { objectId: string; actions: ActionSpec[] }) => void): void {
    this.listener = cb;
  }

  onHoverChange(cb: (e: { objectId: string; over: boolean }) => void): void {
    this.hoverListener = cb;
  }

  private activate(): void {
    if (!this.visible || !this.lastState || !this.listener) return;
    this.listener({ objectId: this.spec.id, actions: availableActions(this.lastState, this.spec) });
  }

  destroy(): void {
    this.handle.destroy();
  }
}
