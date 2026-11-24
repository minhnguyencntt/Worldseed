# UNIT-746 — Act: Subscribe BootScene to playAnimation and dispatch to character sprites

## Summary
Track characters by id and play resolved animations on playAnimation

## Description
Add a character lookup map, a playCharacterAnimation method, and subscribe to reactToPhaser playAnimation in create().

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/phaser/BootScene.ts` · `BootScene fields / import` · L5, L24-L28
- **Do:** Import reactToPhaser alongside phaserToReact from './events'; import type CharacterAnimationName from '@game/engine/characterAnimation'; add private fields characterAnims (Map<string, {sprite, spec, idleKey, interactKey}>) and unsubscribeAnimation ((() => void) | null).

```
import { phaserToReact, reactToPhaser } from './events';
private characterAnims = new Map<string, { sprite: Phaser.GameObjects.Sprite; spec: CharacterSpec }>();
private unsubscribeAnimation: (() => void) | null = null;
```

- **Expected:** File type-checks with the new fields

### Step 2 — `game/frontend/src/phaser/BootScene.ts` · `BootScene.createCharacter` · L105-L128
- **Do:** Before `return sprite`, register the sprite: this.characterAnims.set(spec.id, { sprite, spec }).

```
this.characterAnims.set(spec.id, { sprite, spec });
return sprite;
```

- **Expected:** Every created character is findable by spec.id

### Step 3 — `game/frontend/src/phaser/BootScene.ts` · `new: BootScene.playCharacterAnimation` · after L128
- **Do:** Add private method playCharacterAnimation(target: string, name: string): returns if target missing or name not in ['idle','walk','interact']; resolves ref with resolveCharacterAnimation(spec, name as CharacterAnimationName, manifest), key via this.ensureAnim(ref.asset, ref.animation); returns if key null; sprite.play(key); for non-idle names, once ANIMATION_COMPLETE plays the idle key from ensureAnim of the idle ref.

```
private playCharacterAnimation(target: string, name: string): void {
  const entry = this.characterAnims.get(target);
  if (!entry || !['idle','walk','interact'].includes(name)) return;
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
```

- **Expected:** Method plays the resolved key and ignores unknown targets

### Step 4 — `game/frontend/src/phaser/BootScene.ts` · `BootScene.create` · L69-L70
- **Do:** After characterSprites is assigned, subscribe: this.unsubscribeAnimation = reactToPhaser.on('playAnimation', ({ target, name }) => this.playCharacterAnimation(target, name)).

```
this.unsubscribeAnimation = reactToPhaser.on('playAnimation', ({ target, name }) => this.playCharacterAnimation(target, name));
```

- **Expected:** Emitting playAnimation on reactToPhaser reaches playCharacterAnimation

## Acceptance criteria
- playAnimation with target 'boy' name 'interact' calls play with the interact key
- Unknown target is ignored without throwing

## Definition of done
- BootScene handles playAnimation for known characters
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-746.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-151
- Requirement: REQ-373
- Unit (Act): UNIT-746
- Unit (Verify): UNIT-748
- Status: completed
- Change: UPDATE
