import Phaser from 'phaser';
import type { GameState, SceneDef } from '@game/state/types';
import type { SceneSpec } from '@game/content/schema';
import type { SceneObject } from '@game/entities/SceneObject';
import type { EffectHandle } from '@game/engine/renderContext';
import { buildEffects, destroyEffects } from '@game/engine/buildEffects';
import { buildScene as buildEngineScene } from '@game/engine/buildScene';
import { createPhaserEffectContext } from './effectContext';
import { createPhaserRenderContext } from './renderContext';

export type SceneBuild = {
  objects: SceneObject[];
  effects: EffectHandle[];
  effectContext: ReturnType<typeof createPhaserEffectContext>;
  sync(state: GameState, focusedId: string | null): void;
  dispose(): void;
};

// Creates the authored effects and scene objects for one Phaser scene and returns handles to sync and dispose them.
export function createSceneBuild(
  scene: Phaser.Scene,
  resolveKey: (id: string) => string,
  content: SceneDef,
  spec: SceneSpec,
): SceneBuild {
  const ctx = createPhaserEffectContext(scene, resolveKey);
  const effects = buildEffects(ctx, content);
  const objects = buildEngineScene(createPhaserRenderContext(scene, resolveKey), spec);

  return {
    objects,
    effects,
    effectContext: ctx,
    sync(state: GameState, focusedId: string | null): void {
      for (let i = 0; i < objects.length; i++) objects[i].sync(state);
      for (let i = 0; i < objects.length; i++) {
        const o = objects[i];
        if (focusedId !== null && o.spec.id === focusedId) {
          if (!o.isFocused) o.focus();
        } else if (o.isFocused) {
          o.blur();
        }
      }
    },
    dispose(): void {
      destroyEffects(effects);
      effects.length = 0;
      objects.forEach((o) => o.destroy());
      objects.length = 0;
    },
  };
}
