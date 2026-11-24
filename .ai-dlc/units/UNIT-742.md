# UNIT-742 — Act: Subscribe BootScene to playAnimation and transitionTo

## Summary
Add reactToPhaser handlers in BootScene.create and release them on shutdown

## Description
Add subscriptions in BootScene.create that look up the character sprite by id and play its animation then idle, and replay the transition through the effect context. Release them in the SHUTDOWN handler.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/phaser/BootScene.ts` · `BootScene.createCharacter` · L104-L128
- **Do:** Extract the click body that plays interactKey then idleKey into a method stored per character id: add a private Map<string, (name: string) => void> field characterPlayers, and register in createCharacter a function that plays interactKey for name 'interact' (when interactKey exists and differs from idleKey) then plays idleKey on ANIMATION_COMPLETE, and plays idleKey otherwise; call the same function from the POINTER_DOWN handler after emitting characterClick.

```
this.characterPlayers.set(spec.id, (name) => { if (!idleKey) return; if (name !== 'interact' || !interactKey || interactKey === idleKey) return; sprite.play(interactKey); sprite.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => sprite.play(idleKey)); });
```

- **Expected:** Clicking a character behaves as before and the player is reachable by id

### Step 2 — `game/frontend/src/phaser/BootScene.ts` · `BootScene.create` · L63-L91
- **Do:** Import reactToPhaser from './events'. After playSceneTransition(ctx, scene) add two subscriptions stored in a private offReact array: reactToPhaser.on('playAnimation', ({target, name}) => this.characterPlayers.get(target)?.(name)) and reactToPhaser.on('transitionTo', () => playSceneTransition(ctx, scene)). Reset this.characterPlayers = new Map() before creating characters.

```
this.offReact = [reactToPhaser.on('playAnimation', ({ target, name }) => this.characterPlayers.get(target)?.(name)), reactToPhaser.on('transitionTo', () => playSceneTransition(ctx, scene))];
```

- **Expected:** Events from React play the animation and the transition

### Step 3 — `game/frontend/src/phaser/BootScene.ts` · `BootScene.create SHUTDOWN handler` · L73-L83
- **Do:** Inside the SHUTDOWN handler call each function in this.offReact, set this.offReact = [], and call this.characterPlayers.clear().
- **Expected:** No handler runs after shutdown

## Acceptance criteria
- playAnimation plays the named animation on the matching character and returns to idle
- transitionTo calls playSceneTransition with the scene and effect context
- Shutdown removes both subscriptions

## Definition of done
- BootScene handles both events and cleans up
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-742.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-150
- Requirement: REQ-371
- Unit (Act): UNIT-742
- Unit (Verify): UNIT-744
- Status: approved
- Change: UPDATE
