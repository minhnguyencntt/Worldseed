import Phaser from 'phaser';
import type { SceneDef } from '@game/state/types';
import type { AssetEntry, AssetManifest } from '@game/assets/manifest';
import { planPreload } from '@game/engine/planPreload';

// Queues the loads for one scene's plan on the given scene's loader, as BootScene.preload did inline.
export function createPreloader(scene: Phaser.Scene, sceneDef: SceneDef, manifest: AssetManifest): void {
  const plan = planPreload(sceneDef, manifest);
  plan.unknown.forEach((id) => console.warn(`unknown asset ref: ${id}`));
  for (const id of plan.load) {
    const entry = manifest.assets.find((a: AssetEntry) => a.id === id);
    if (entry && entry.type === 'image') scene.load.image(entry.id, `assets/${entry.path}`);
    else if (entry && entry.type === 'spritesheet' && entry.frames)
      scene.load.spritesheet(entry.id, `assets/${entry.path}`, {
        frameWidth: entry.frames.frameWidth,
        frameHeight: entry.frames.frameHeight,
      });
  }
}
