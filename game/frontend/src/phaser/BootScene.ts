import Phaser from 'phaser';
import type { GameState } from '@game/state/types';
import { useGameStore } from '../store/gameStore';
import { phaserToReact } from './events';
import { createPhaserEffectContext } from './effectContext';
import { buildEffects } from '@game/engine/buildEffects';
import { playSceneTransition } from '@game/engine/playSceneTransition';
import type { EffectHandle } from '@game/engine/renderContext';
import { manifest, scene } from '../runtime/content';
import { planPreload } from '@game/engine/planPreload';

// Reads game state from the shared Zustand store; never keeps its own copy of GameState.
export class BootScene extends Phaser.Scene {
  private unsubscribe: (() => void) | null = null;
  private effects: EffectHandle[] = [];

  constructor() {
    super('BootScene');
  }

  readState(): GameState | null {
    return useGameStore.getState().state;
  }

  preload(): void {
    const plan = planPreload(scene, manifest);
    plan.unknown.forEach((id) => console.warn(`unknown asset ref: ${id}`));
    for (const id of plan.load) {
      const entry = manifest.assets.find((a) => a.id === id);
      if (entry && entry.type === 'image') this.load.image(entry.id, `assets/${entry.path}`);
    }
  }

  create(): void {
    this.unsubscribe = useGameStore.subscribe(() => this.onStateChange());
    const ctx = createPhaserEffectContext(this);
    this.effects = buildEffects(ctx, scene);
    playSceneTransition(ctx, scene);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.unsubscribe?.();
      this.unsubscribe = null;
      this.effects.forEach((handle) => handle.destroy());
      this.effects = [];
    });
    phaserToReact.emit('sceneReady', { sceneId: 'boot' });
  }

  onStateChange(): void {
    this.readState();
  }
}
