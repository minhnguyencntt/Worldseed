import Phaser from 'phaser';
import type { GameState } from '@game/state/types';
import { useGameStore } from '../store/gameStore';
import { phaserToReact, reactToPhaser, type Unsubscribe } from './events';
import { createPhaserEffectContext } from './effectContext';
import { playSceneTransition } from '@game/engine/playSceneTransition';
import { scene, sceneSpec, manifest } from '../runtime/content';
import { resolveTextureKey } from '@game/engine/planPreload';
import { createPreloader, FALLBACK_KEY, type Preloader } from './preload';
import { createInputLayer, type InputLayer } from './input';
import { createSceneBuild, type SceneBuild } from './buildScene';
import { createCharacters, type Characters } from './characters';

export { FALLBACK_KEY };
export const TRANSITION_FADE_MS = 300;

// Reads game state from the shared Zustand store; never keeps its own copy of GameState.
export class BootScene extends Phaser.Scene {
  private unsubscribe: Unsubscribe | null = null;
  private preloader: Preloader | null = null;
  private build: SceneBuild | null = null;
  private characters: Characters | null = null;
  private unsubscribeTransition: Unsubscribe | null = null;
  private inputLayer: InputLayer | null = null;

  constructor() {
    super('BootScene');
  }

  readState(): GameState | null {
    return useGameStore.getState().state;
  }

  preload(): void {
    this.preloader = createPreloader(this, scene, manifest);
  }

  // Maps an asset id to a loaded texture key, or the fallback for unknown or failed ids.
  resolveKey(id: string): string {
    return this.preloader?.resolveKey(id) ?? resolveTextureKey(id, manifest, FALLBACK_KEY);
  }

  create(): void {
    this.unsubscribe = useGameStore.subscribe(() => this.onStateChange());
    const resolve = (id: string): string => this.resolveKey(id);
    this.build = createSceneBuild(this, resolve, scene, sceneSpec);
    this.inputLayer = createInputLayer(this.input, this.build.objects);
    this.characters = createCharacters(this, scene.characters ?? [], manifest, resolve, this.inputLayer);
    this.unsubscribeTransition = reactToPhaser.on('transitionTo', ({ sceneId }) => {
      if (!sceneId || !this.scene.get(sceneId)) return;
      const cam = this.cameras.main;
      cam.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => this.scene.start(sceneId));
      cam.fadeOut(TRANSITION_FADE_MS);
    });
    this.onStateChange();
    playSceneTransition(createPhaserEffectContext(this, resolve), scene);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.inputLayer?.destroy();
      this.inputLayer = null;
      this.preloader?.dispose();
      this.preloader = null;
      this.unsubscribe?.();
      this.unsubscribe = null;
      this.build?.dispose();
      this.build = null;
      this.characters?.dispose();
      this.characters = null;
      this.unsubscribeTransition?.();
      this.unsubscribeTransition = null;
    });
    phaserToReact.emit('sceneReady', { sceneId: 'boot' });
  }

  onStateChange(): void {
    const state = this.readState();
    if (!state) return;
    this.build?.sync(state, useGameStore.getState().focusedObjectId);
  }
}
