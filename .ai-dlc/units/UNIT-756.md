# UNIT-756 — Act: Confirm create stores the transitionTo unsubscribe in unsubscribeTransition

## Summary
Verify and keep the stored unsubscribe assignment in BootScene.create

## Description
The code already declares unsubscribeTransition and assigns it in create. Read it and leave it unchanged unless it deviates from the spec; no new behavior is planned.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/phaser/BootScene.ts` · `BootScene.unsubscribeTransition` · L33
- **Do:** Confirm the private field is declared as `private unsubscribeTransition: (() => void) | null = null;` and change nothing if so
- **Expected:** Field exists with the nullable function type

### Step 2 — `game/frontend/src/phaser/BootScene.ts` · `BootScene.create` · L76-L80
- **Do:** Confirm `this.unsubscribeTransition = reactToPhaser.on('transitionTo', ...)` assigns the returned function; if the return value is discarded, assign it to this.unsubscribeTransition

```
this.unsubscribeTransition = reactToPhaser.on('transitionTo', ({ sceneId }) => { /* fade then scene.start */ });
```

- **Expected:** Subscription handle is stored in the field

## Acceptance criteria
- unsubscribeTransition is assigned the return value of reactToPhaser.on('transitionTo', ...)
- The handler fades out then starts the scene on FADE_OUT_COMPLETE

## Definition of done
- Assignment present and correct
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-756.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-154
- Requirement: REQ-378
- Unit (Act): UNIT-756
- Unit (Verify): UNIT-758
- Status: completed
- Change: UPDATE
