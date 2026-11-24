# UNIT-706 — Act: Confirm BootScene pushes store changes into every SceneObject

## Summary
Confirm create subscribes to the store and onStateChange syncs all objects, null-safe

## Description
Read-only confirmation of the existing store to scene path; no behavior change expected unless the path is broken.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/phaser/BootScene.ts` · `BootScene.create` · L71
- **Do:** Confirm the line this.unsubscribe = useGameStore.subscribe(() => this.onStateChange()) exists and is released in the SHUTDOWN handler; do not change it.
- **Expected:** Subscription present and released on shutdown

### Step 2 — `game/frontend/src/phaser/BootScene.ts` · `BootScene.onStateChange` · L128-L132
- **Do:** Confirm it returns early when readState() is null and otherwise calls o.sync(state) for each entry of this.sceneObjects; leave unchanged.
- **Expected:** Every SceneObject.sync receives the current state; null state is ignored

## Acceptance criteria
- create subscribes to useGameStore and calls onStateChange
- onStateChange syncs every object and ignores null state

## Definition of done
- Path confirmed; fix only if broken
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-706.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-142
- Requirement: REQ-354
- Unit (Act): UNIT-706
- Unit (Verify): UNIT-709
- Status: approved
- Change: UPDATE
