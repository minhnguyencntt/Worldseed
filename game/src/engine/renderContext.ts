import type { EffectSpec } from '../content/schema';

export interface RenderHandle {
  setVisible(visible: boolean): void;
  destroy(): void;
  setHighlighted(on: boolean): void;
  setLabelVisible(on: boolean): void;
  onHover(cb: (over: boolean) => void): void;
  onClick(cb: () => void): void;
}
export interface RenderSpriteSpec {
  key: string;
  x: number;
  y: number;
  scale: number;
  depth: number;
  label?: string;
  bounds?: { x: number; y: number; width: number; height: number };
}
export interface RenderContext { createSprite(spec: RenderSpriteSpec): RenderHandle }
export interface EffectHandle { destroy(): void }
export interface EffectRenderContext {
  createEffect(spec: EffectSpec & { depth: number }): EffectHandle;
  playTransition(durationMs: number): void;
}
