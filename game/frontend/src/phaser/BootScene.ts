import Phaser from 'phaser';
import type { GameState } from '@game/state/types';
import type { AssetEntry } from '@game/assets/manifest';
import { useGameStore } from '../store/gameStore';
import { phaserToReact, reactToPhaser } from './events';
import { createPhaserEffectContext } from './effectContext';
import { buildEffects, destroyEffects } from '@game/engine/buildEffects';
import { playSceneTransition } from '@game/engine/playSceneTransition';
import type { EffectHandle } from '@game/engine/renderContext';
import { manifest, scene, sceneSpec } from '../runtime/content';
import { planPreload, resolveTextureKey } from '@game/engine/planPreload';
import { buildScene, moveFocus } from '@game/engine/buildScene';
import type { SceneObject } from '@game/entities/SceneObject';
import { createPhaserRenderContext } from './renderContext';
import { resolveCharacterAnimation } from '@game/engine/characterAnimation';
import type { CharacterAnimationName } from '@game/engine/characterAnimation';
import type { CharacterSpec } from '@game/content/schema';
import { layerDepth } from '@game/engine/layers';
import type { AnimationDef } from '@game/assets/manifest';

export const FALLBACK_KEY = 'fallback:missing';
export const TRANSITION_FADE_MS = 300;

// Reads game state from the shared Zustand store; never keeps its own copy of GameState.
export class BootScene extends Phaser.Scene {
  private unsubscribe: (() => void) | null = null;
  private effects: EffectHandle[] = [];
  private sceneObjects: SceneObject[] = [];
  private failed = new Set<string>();
  private characterSprites: Phaser.GameObjects.Sprite[] = [];
  private characterAnims = new Map<string, { sprite: Phaser.GameObjects.Sprite; spec: CharacterSpec }>();
  private unsubscribeAnimation: (() => void) | null = null;
  private unsubscribeTransition: (() => void) | null = null;

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
      const entry = manifest.assets.find((a: AssetEntry) => a.id === id);
      if (entry && entry.type === 'image') this.load.image(entry.id, `assets/${entry.path}`);
      else if (entry && entry.type === 'spritesheet' && entry.frames)
        this.load.spritesheet(entry.id, `assets/${entry.path}`, {
          frameWidth: entry.frames.frameWidth,
          frameHeight: entry.frames.frameHeight,
        });
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
    this.sceneObjects.forEach((o) => o.onHoverChange((e) => phaserToReact.emit('objectHover', { id: e.over ? e.objectId : null })));
    this.characterSprites = (scene.characters ?? []).map((c) => this.createCharacter(c));
    this.unsubscribeAnimation = reactToPhaser.on('playAnimation', ({ target, name }) => this.playCharacterAnimation(target, name));
    this.unsubscribeTransition = reactToPhaser.on('transitionTo', ({ sceneId }) => {
      const cam = this.cameras.main;
      cam.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => this.scene.start(sceneId));
      cam.fadeOut(TRANSITION_FADE_MS);
    });
    this.input.keyboard?.on('keydown', this.onKeyDown);
    this.onStateChange();
    playSceneTransition(ctx, scene);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.input.keyboard?.off('keydown', this.onKeyDown);
      this.unsubscribe?.();
      this.unsubscribe = null;
      destroyEffects(this.effects);
      this.effects = [];
      this.sceneObjects.forEach((o) => o.destroy());
      this.sceneObjects = [];
      this.characterSprites.forEach((s) => s.destroy());
      this.characterSprites = [];
      this.characterAnims.clear();
      this.unsubscribeAnimation?.();
      this.unsubscribeAnimation = null;
      this.unsubscribeTransition?.();
      this.unsubscribeTransition = null;
    });
    phaserToReact.emit('sceneReady', { sceneId: 'boot' });
  }

  // Registers the manifest animation as a Phaser animation once, keyed `${asset}:${animation}`.
  private ensureAnim(assetId: string, animation: string): string | null {
    const key = `${assetId}:${animation}`;
    const asset = manifest.assets.find((a) => a.id === assetId);
    const def: AnimationDef | undefined = asset?.animations?.[animation];
    if (!asset || !def || !this.textures.exists(assetId)) return null;
    if (!this.anims.exists(key)) {
      this.anims.create({
        key,
        frames: this.anims.generateFrameNumbers(assetId, { frames: def.frames }),
        frameRate: def.frameRate,
        repeat: def.repeat,
      });
    }
    return key;
  }

  // Places a character sprite, idles it, and plays interact then idle when it is clicked.
  private createCharacter(spec: CharacterSpec): Phaser.GameObjects.Sprite {
    const idle = resolveCharacterAnimation(spec, 'idle', manifest);
    const interact = resolveCharacterAnimation(spec, 'interact', manifest);
    const origin = manifest.assets.find((a) => a.id === idle.asset)?.origin ?? { x: 0, y: 0 };
    const idleKey = this.ensureAnim(idle.asset, idle.animation);
    const interactKey = this.ensureAnim(interact.asset, interact.animation);

    const sprite = this.add
      .sprite(spec.position.x, spec.position.y, idleKey ? idle.asset : this.resolveKey(idle.asset))
      .setOrigin(origin.x, origin.y)
      .setScale(spec.scale)
      .setDepth(layerDepth(spec.layer));
    if (idleKey) sprite.play(idleKey);

    sprite.setInteractive({ useHandCursor: true });
    sprite.on(Phaser.Input.Events.POINTER_DOWN, () => {
      phaserToReact.emit('characterClick', { id: spec.id });
      if (!idleKey) return;
      if (!interactKey || interactKey === idleKey) return;
      sprite.play(interactKey);
      sprite.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => sprite.play(idleKey));
    });
    this.characterAnims.set(spec.id, { sprite, spec });
    return sprite;
  }

  // Plays a named animation on the character with the given id; unknown targets or names are ignored.
  private playCharacterAnimation(target: string, name: string): void {
    const entry = this.characterAnims.get(target);
    if (!entry || !['idle', 'walk', 'interact'].includes(name)) return;
    const ref = resolveCharacterAnimation(entry.spec, name as CharacterAnimationName, manifest);
    const key = this.ensureAnim(ref.asset, ref.animation);
    if (!key) return;
    entry.sprite.play(key);
    if (name !== 'idle') {
      const idle = resolveCharacterAnimation(entry.spec, 'idle', manifest);
      const idleKey = this.ensureAnim(idle.asset, idle.animation);
      if (idleKey && idleKey !== key) entry.sprite.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => entry.sprite.play(idleKey));
    }
  }

  onStateChange(): void {
    const state = this.readState();
    if (!state) return;
    this.sceneObjects.forEach((o) => o.sync(state));
    this.applyFocusedObject(useGameStore.getState().focusedObjectId);
  }

  private applyFocusedObject(id: string | null): void {
    this.sceneObjects.forEach((o) => {
      if (id !== null && o.spec.id === id) {
        if (!o.isFocused) o.focus();
      } else if (o.isFocused) o.blur();
    });
  }

  private focusedObjectIdFromScene(): string | null { return this.sceneObjects.find((o) => o.isFocused)?.spec.id ?? null; }

  private onKeyDown = (e: KeyboardEvent): void => {
    const delta = e.key === 'Tab' ? (e.shiftKey ? -1 : 1) : e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
    if (delta !== 0) {
      e.preventDefault();
      moveFocus(this.sceneObjects, delta as 1 | -1);
      const id = this.focusedObjectIdFromScene();
      useGameStore.getState().setFocusedObject(id);
      phaserToReact.emit('focusChange', { id });
    } else if (e.key === 'Enter' || e.key === ' ') this.sceneObjects.forEach((o) => o.handleKey(e.key));
    else if (e.key === 'Escape') phaserToReact.emit('menuClose', {});
  };
}
