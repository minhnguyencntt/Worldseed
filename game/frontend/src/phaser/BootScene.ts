import Phaser from 'phaser';
import type { GameState } from '@game/state/types';
import { useGameStore } from '../store/gameStore';
import { phaserToReact } from './events';
import { createPhaserEffectContext } from './effectContext';
import { buildEffects } from '@game/engine/buildEffects';
import type { EffectHandle } from '@game/engine/renderContext';
import { scene } from '../runtime/content';

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

  create(): void {
    this.unsubscribe = useGameStore.subscribe(() => this.onStateChange());
    this.effects = buildEffects(createPhaserEffectContext(this), scene);
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
