import Phaser from 'phaser';
import type { CharacterSpec } from '@game/content/schema';
import type { AnimationDef, AssetManifest } from '@game/assets/manifest';
import { resolveCharacterAnimation } from '@game/engine/characterAnimation';
import type { CharacterAnimationName } from '@game/engine/characterAnimation';
import { layerDepth } from '@game/engine/layers';
import type { InputLayer } from './input';
import { reactToPhaser, type Unsubscribe } from './events';

export interface Characters {
  sprites: Phaser.GameObjects.Sprite[];
  play(target: string, name: string): void;
  dispose(): void;
}

// Creates the character sprites for a scene, idles them, and wires click and animation events.
export function createCharacters(
  scene: Phaser.Scene,
  specs: CharacterSpec[],
  manifest: AssetManifest,
  resolveKey: (id: string) => string,
  input: InputLayer,
): Characters {
  const sprites: Phaser.GameObjects.Sprite[] = [];
  const map = new Map<string, { sprite: Phaser.GameObjects.Sprite; spec: CharacterSpec }>();
  const createdAnims: string[] = [];

  // Registers the manifest animation as a Phaser animation once, keyed `${asset}:${animation}`.
  const ensureAnim = (assetId: string, animation: string): string | null => {
    const key = `${assetId}:${animation}`;
    const asset = manifest.assets.find((a) => a.id === assetId);
    const def: AnimationDef | undefined = asset?.animations?.[animation];
    if (!asset || !def || !scene.textures.exists(assetId)) return null;
    if (!scene.anims.exists(key)) {
      scene.anims.create({
        key,
        frames: scene.anims.generateFrameNumbers(assetId, { frames: def.frames }),
        frameRate: def.frameRate,
        repeat: def.repeat,
      });
      createdAnims.push(key);
    }
    return key;
  };

  // Places a character sprite, idles it, and plays interact then idle when it is clicked.
  const createCharacter = (spec: CharacterSpec): Phaser.GameObjects.Sprite => {
    const idle = resolveCharacterAnimation(spec, 'idle', manifest);
    const interact = resolveCharacterAnimation(spec, 'interact', manifest);
    const origin = manifest.assets.find((a) => a.id === idle.asset)?.origin ?? { x: 0, y: 0 };
    const idleKey = ensureAnim(idle.asset, idle.animation);
    const interactKey = ensureAnim(interact.asset, interact.animation);

    const sprite = scene.add
      .sprite(spec.position.x, spec.position.y, idleKey ? idle.asset : resolveKey(idle.asset))
      .setOrigin(origin.x, origin.y)
      .setScale(spec.scale)
      .setDepth(layerDepth(spec.layer));
    if (idleKey) sprite.play(idleKey);

    sprite.setInteractive({ useHandCursor: true });
    input.bindCharacter(sprite, spec.id, () => {
      if (!idleKey) return;
      if (!interactKey || interactKey === idleKey) return;
      sprite.play(interactKey);
      sprite.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => sprite.play(idleKey));
    });
    map.set(spec.id, { sprite, spec });
    return sprite;
  };

  // Plays a named animation on the character with the given id; unknown targets or names are ignored.
  const playCharacterAnimation = (target: string, name: string): void => {
    const entry = map.get(target);
    if (!entry || !['idle', 'walk', 'interact'].includes(name)) return;
    const ref = resolveCharacterAnimation(entry.spec, name as CharacterAnimationName, manifest);
    const key = ensureAnim(ref.asset, ref.animation);
    if (!key) return;
    entry.sprite.play(key);
    if (name !== 'idle') {
      const idle = resolveCharacterAnimation(entry.spec, 'idle', manifest);
      const idleKey = ensureAnim(idle.asset, idle.animation);
      if (idleKey && idleKey !== key) entry.sprite.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => entry.sprite.play(idleKey));
    }
  };

  for (const spec of specs) sprites.push(createCharacter(spec));

  const unsubscribe: Unsubscribe = reactToPhaser.on('playAnimation', ({ target, name }) => playCharacterAnimation(target, name));

  return {
    sprites,
    play: playCharacterAnimation,
    dispose(): void {
      unsubscribe();
      for (let i = 0; i < sprites.length; i++) {
        sprites[i].removeAllListeners();
        sprites[i].destroy();
      }
      sprites.length = 0;
      map.clear();
      for (let i = 0; i < createdAnims.length; i++) scene.anims.remove(createdAnims[i]);
      createdAnims.length = 0;
    },
  };
}
