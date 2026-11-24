# UNIT-750 — Act: Subscribe BootScene to transitionTo with fade-out and scene start

## Summary
Add transitionTo subscription and handler in BootScene

## Description
In BootScene.ts add a private unsubscribeTransition field, subscribe in create after the playAnimation subscription, and add a handler that fades out then starts the scene.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/phaser/BootScene.ts` · `BootScene (fields)` · after L31
- **Do:** Add a private field unsubscribeTransition typed (() => void) | null initialised to null, next to unsubscribeAnimation.

```
private unsubscribeTransition: (() => void) | null = null;
```

- **Expected:** Field exists and compiles.

### Step 2 — `game/frontend/src/phaser/BootScene.ts` · `BootScene.transitionToScene` · after L151
- **Do:** Add private method transitionToScene(sceneId: string) that reads the durationMs of the first scene.effects entry with type 'transition' (default 400), calls this.cameras.main.fadeOut(durationMs), and registers this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => this.scene.start(sceneId)).

```
private transitionToScene(sceneId: string): void {
  const spec = (scene.effects ?? []).find((e) => e.type === 'transition');
  const durationMs = spec && spec.type === 'transition' ? spec.durationMs : 400;
  this.cameras.main.fadeOut(durationMs);
  this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => this.scene.start(sceneId));
}
```

- **Expected:** Method compiles and is the only place that fades out.

### Step 3 — `game/frontend/src/phaser/BootScene.ts` · `BootScene.create` · after L73
- **Do:** Subscribe to the transitionTo event and store the returned unsubscribe in this.unsubscribeTransition.

```
this.unsubscribeTransition = reactToPhaser.on('transitionTo', ({ sceneId }) => this.transitionToScene(sceneId));
```

- **Expected:** Emitting transitionTo calls transitionToScene.

## Acceptance criteria
- transitionTo emit calls cameras.main.fadeOut
- FADE_OUT_COMPLETE calls scene.start with the sceneId

## Definition of done
- Handler implemented in BootScene.ts
- Type-check passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-750.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-152
- Requirement: REQ-375
- Unit (Act): UNIT-750
- Unit (Verify): UNIT-752
- Status: approved
- Change: UPDATE
