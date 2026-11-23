import Phaser from 'phaser';
import type { GameState } from '@game/state/types';
import { useGameStore } from '../store/gameStore';
import { phaserToReact } from './events';

// Reads game state from the shared Zustand store; never keeps its own copy of GameState.
export class BootScene extends Phaser.Scene {
  private unsubscribe: (() => void) | null = null;

  constructor() {
    super('BootScene');
  }

  readState(): GameState | null {
    return useGameStore.getState().state;
  }

  create(): void {
    this.unsubscribe = useGameStore.subscribe(() => this.onStateChange());
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.unsubscribe?.();
      this.unsubscribe = null;
    });
    phaserToReact.emit('sceneReady', { sceneId: 'boot' });
  }

  onStateChange(): void {
    this.readState();
  }
}
