import type Phaser from 'phaser';
import type { SceneDef } from '@game/state/types';
import type { AssetEntry, AssetManifest } from '@game/assets/manifest';
import { planPreload, resolveTextureKey } from '@game/engine/planPreload';

export const FALLBACK_KEY = 'fallback:missing';

export type Preloader = {
  resolveKey(id: string): string;
  dispose(): void;
};

// Generates the fallback texture, queues the planned assets and tracks failed loads.
// dispose() removes the loaderror listener and the fallback texture and clears failed ids.
export function createPreloader(scene: Phaser.Scene, content: SceneDef, manifest: AssetManifest): Preloader {
  const failed = new Set<string>();

  const g = scene.make.graphics({ x: 0, y: 0 }, false);
  g.fillStyle(0xff00ff).fillRect(0, 0, 8, 8).fillStyle(0x000000).fillRect(0, 0, 4, 4).fillRect(4, 4, 4, 4);
  g.generateTexture(FALLBACK_KEY, 8, 8);
  g.destroy();

  const onLoadError = (file: { key: string }) => failed.add(file.key);
  scene.load.on('loaderror', onLoadError);

  const plan = planPreload(content, manifest);
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

  return {
    // Maps an asset id to a loaded texture key, or the fallback for unknown or failed ids.
    resolveKey(id: string): string {
      return failed.has(id) ? FALLBACK_KEY : resolveTextureKey(id, manifest, FALLBACK_KEY);
    },
    dispose(): void {
      scene.load.off('loaderror', onLoadError);
      if (scene.textures.exists(FALLBACK_KEY)) scene.textures.remove(FALLBACK_KEY);
      failed.clear();
    },
  };
}
