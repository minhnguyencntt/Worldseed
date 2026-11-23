import Phaser from 'phaser';
import type { EffectSpec } from '@game/content/schema';
import type { EffectHandle, EffectRenderContext } from '@game/engine/renderContext';

// Phaser-backed implementation of the engine's EffectRenderContext.
export function createPhaserEffectContext(
  scene: Phaser.Scene,
  resolveKey: (id: string) => string,
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
              parseInt(spec.color.slice(1), 16),
              spec.alpha,
            )
            .setOrigin(0)
            .setDepth(spec.depth);
          return { destroy: () => rect.destroy() };
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
