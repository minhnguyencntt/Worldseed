# UNIT-754 — Act: Subscribe BootScene.create to transitionTo with fade-out and scene start

## Summary
Add a transitionTo subscription in BootScene.create that fades the camera out then starts the scene.

## Description
Add a private field holding the unsubscribe function and register the handler in create() next to the playAnimation subscription. The handler calls this.cameras.main.fadeOut(TRANSITION_FADE_MS) and registers a one-time listener for the camera fade-out-complete event that calls this.scene.start(sceneId).

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/phaser/BootScene.ts` · `FALLBACK_KEY (module constants)` · after L20
- **Do:** Add an exported constant TRANSITION_FADE_MS holding the fade-out duration in milliseconds.

```
export const TRANSITION_FADE_MS = 300;
```

- **Expected:** BootScene.ts exports TRANSITION_FADE_MS = 300.

### Step 2 — `game/frontend/src/phaser/BootScene.ts` · `BootScene.unsubscribeTransition` · after L30
- **Do:** Add a private field next to unsubscribeAnimation to hold the transitionTo unsubscribe function.

```
private unsubscribeTransition: (() => void) | null = null;
```

- **Expected:** Class compiles with the new field.

### Step 3 — `game/frontend/src/phaser/BootScene.ts` · `BootScene.create` · after L73
- **Do:** After the playAnimation subscription line, subscribe to transitionTo. The handler fades the main camera out, then once on FADE_OUT_COMPLETE starts the requested scene.

```
this.unsubscribeTransition = reactToPhaser.on('transitionTo', ({ sceneId }) => {
  const cam = this.cameras.main;
  cam.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => this.scene.start(sceneId));
  cam.fadeOut(TRANSITION_FADE_MS);
});
```

- **Expected:** Emitting transitionTo calls fadeOut; scene.start runs only after the fade-out-complete event.

## Acceptance criteria
- transitionTo emission calls cameras.main.fadeOut once with TRANSITION_FADE_MS.
- scene.start(sceneId) is called only after fade-out-complete fires.

## Definition of done
- Subscription added in create()
- tsc --noEmit passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-754.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-153
- Requirement: REQ-377
- Unit (Act): UNIT-754
- Unit (Verify): UNIT-755
- Status: completed
- Change: UPDATE
