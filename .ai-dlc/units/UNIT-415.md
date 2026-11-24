# UNIT-415 — Act: Document the 3.90 lifecycle APIs in BootScene and PhaserHost

## Summary
Keep 3.90 lifecycle APIs and state the target

## Description
The audit found BootScene and PhaserHost use only 3.90 APIs. Add comments naming them. Do not change behavior.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/phaser/BootScene.ts` · `BootScene.create` · L18-L25
- **Do:** Add a comment above this.events.once stating that Phaser.Scenes.Events.SHUTDOWN and Scene.events.once are 3.90 APIs.

```
// Phaser 3.90: Scenes.Events.SHUTDOWN via this.events.once.
```

- **Expected:** Method body otherwise unchanged.

### Step 2 — `game/frontend/src/components/PhaserHost.tsx` · `PhaserHost` · L12-L28
- **Do:** Add a comment above the ResizeObserver stating that game.scale.refresh() and game.destroy(true) are the Phaser 3.90 resize and cleanup APIs.

```
// Phaser 3.90: scale.refresh() on resize, destroy(true) on unmount.
```

- **Expected:** Effect body unchanged.

## Acceptance criteria
- Given BootScene.ts, when read, then a comment states it uses Phaser.Scenes.Events.SHUTDOWN and this.events.once from 3.90.
- Given PhaserHost.tsx, when read, then a comment states it uses game.scale.refresh and game.destroy(true) from 3.90.

## Definition of done
- Comments added; tests/bootScene.test.ts and tests/phaserHost.test.tsx still pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-415.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-083
- Requirement: REQ-208
- Unit (Act): UNIT-415
- Unit (Verify): UNIT-417
- Status: completed
- Change: UPDATE
