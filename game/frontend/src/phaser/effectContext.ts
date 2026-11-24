import Phaser from 'phaser';
import type { EffectSpec } from '@game/content/schema';
import type { EffectHandle, EffectRenderContext } from '@game/engine/renderContext';

export type ResolveKey = (id: string) => string;

const parseColor = (hex: string): number => parseInt(hex.slice(1), 16);

// Phaser-backed implementation of the engine's EffectRenderContext.
export function createPhaserEffectContext(
  scene: Phaser.Scene,
  resolveKey: ResolveKey,
): EffectRenderContext {
  return {
    createEffect(spec: EffectSpec & { depth: number }): EffectHandle {
      switch (spec.type) {
        case 'dust': {
          const { area } = spec;
          const emitter = scene.add
            .particles(area.x, area.y, resolveKey(spec.asset), {
              quantity: 1,
              frequency: 250,
              maxParticles: spec.count,
              lifespan: 6000,
              speed: { min: -4, max: 4 },
              // Random points inside the authored area, relative to the emitter origin at (area.x, area.y).
              emitZone: {
                type: 'random' as const,
                source: {
                  getRandomPoint: (point: { x: number; y: number }) => {
                    point.x = Math.random() * area.width;
                    point.y = Math.random() * area.height;
                  },
                },
              },
            })
            .setDepth(spec.depth);
          return { destroy: () => emitter.destroy() };
        }
        case 'ambientLight': {
          const rect = scene.add
            .rectangle(
              0,
              0,
              scene.scale.width,
              scene.scale.height,
              parseColor(spec.color),
              spec.alpha,
            )
            .setOrigin(0)
            .setDepth(spec.depth);
          return { destroy: () => rect.destroy() };
        }
        case 'moonlightShaft':
        case 'doorLight': {
          const { area } = spec;
          const shaft = scene.add
            .rectangle(area.x, area.y, area.width, area.height, parseColor(spec.color), spec.alpha)
            .setOrigin(0)
            .setDepth(spec.depth)
            .setBlendMode('ADD');
          return { destroy: () => shaft.destroy() };
        }
        case 'lampGlow': {
          const glow = scene.add
            .circle(spec.x, spec.y, spec.radius, parseColor(spec.color), spec.alpha)
            .setDepth(spec.depth)
            .setBlendMode('ADD');
          return { destroy: () => glow.destroy() };
        }
        case 'vignette': {
          const w = scene.scale.width;
          const h = scene.scale.height;
          const bands = [24, 16, 8].map((lineWidth) =>
            scene.add
              .rectangle(w / 2, h / 2, w, h)
              .setStrokeStyle(lineWidth, parseColor(spec.color), spec.alpha / 3)
              .setDepth(spec.depth),
          );
          return { destroy: () => bands.forEach((band) => band.destroy()) };
        }
        case 'transition':
          // Transitions are played through playTransition, not rendered as persistent objects.
          return { destroy: () => {} };
      }
    },
    playTransition(durationMs: number): void {
      scene.cameras.main.fadeIn(durationMs);
    },
  };
}
