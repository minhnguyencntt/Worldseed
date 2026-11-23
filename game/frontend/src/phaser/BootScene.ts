import Phaser from 'phaser';
import type { GameState } from '@game/state/types';
import { useGameStore } from '../store/gameStore';
import { phaserToReact } from './events';
import { createPhaserEffectContext } from './effectContext';
import { buildEffects } from '@game/engine/buildEffects';
import { playSceneTransition } from '@game/engine/playSceneTransition';
import type { EffectHandle } from '@game/engine/renderContext';
import { manifest, scene, sceneSpec } from '../runtime/content';
import { planPreload, resolveTextureKey } from '@game/engine/planPreload';
import { buildScene } from '@game/engine/buildScene';
import type { SceneObject } from '@game/entities/SceneObject';
import { createPhaserRenderContext } from './renderContext';
import type { SceneObject } from '@game/entities/SceneObject';

export const FALLBACK_KEY = 'fallback:missing';

// Reads game state from the shared Zustand store; never keeps its own copy of GameState.
export class BootScene extends Phaser.Scene {
  private unsubscribe: (() => void) | null = null;
  private effects: EffectHandle[] = [];
  private sceneObjects: SceneObject[] = [];
  private sceneObjects: SceneObject[] = [];
  private failed = new Set<string>();

  constructor() {
    super('BootScene');
  }

  readState(): GameState | null {
    return useGameStore.getState().state;
  }

  preload(): void {
    const g = this.make.graphics({ x: 0, y: 0 }, false);
    g.fillStyle(0xff00ff).fillRect(0, 0, 8, 8).fillStyle(0x000000).fillRect(0, 0, 4, 4).fillRect(4, 4, 4, 4);
    g.generateTexture(FALLBACK_KEY, 8, 8);
    g.destroy();
    this.load.on('loaderror', (file: { key: string }) => this.failed.add(file.key));

    const plan = planPreload(scene, manifest);
    plan.unknown.forEach((id) => console.warn(`unknown asset ref: ${id}`));
    for (const id of plan.load) {
      const entry = manifest.assets.find((a) => a.id === id);
      if (entry && entry.type === 'image') this.load.image(entry.id, `assets/${entry.path}`);
    }
  }

  // Maps an asset id to a loaded texture key, or the fallback for unknown or failed ids.
  resolveKey(id: string): string {
    return this.failed.has(id) ? FALLBACK_KEY : resolveTextureKey(id, manifest, FALLBACK_KEY);
  }

  create(): void {
    this.unsubscribe = useGameStore.subscribe(() => this.onStateChange());
    const ctx = createPhaserEffectContext(this, (id) => this.resolveKey(id));
    this.effects = buildEffects(ctx, scene);
    this.sceneObjects = buildScene(createPhaserRenderContext(this, (id) => this.resolveKey(id)), sceneSpec);
    this.sceneObjects.forEach((o) => o.onInteract((e) => phaserToReact.emit('objectClick', { id: e.objectId })));
    this.onStateChange();
    playSceneTransition(ctx, scene);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.unsubscribe?.();
      this.unsubscribe = null;
      this.effects.forEach((handle) => handle.destroy());
      this.effects = [];
      this.sceneObjects.forEach((o) => o.destroy());
      this.sceneObjects = [];
    });
    phaserToReact.emit('sceneReady', { sceneId: 'boot' });
  }

  onStateChange(): void {
    const state = this.readState();
    if (!state) return;
    this.sceneObjects.forEach((o) => o.sync(state));
  }
}
