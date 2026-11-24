# UNIT-718 — Act: Remove scene and store focus in the BootScene SHUTDOWN handler

## Summary
Blur every SceneObject and set focusedObjectId to null on shutdown

## Description
Extend the SHUTDOWN callback in BootScene.create so focus is cleared after the store is unsubscribed and before objects are destroyed.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/phaser/BootScene.ts` · `BootScene.create SHUTDOWN handler` · L73-L84
- **Do:** Immediately after this.unsubscribe = null and before this.effects.forEach, add a loop calling o.blur() on every this.sceneObjects entry, then call useGameStore.getState().setFocusedObject(null).

```
this.sceneObjects.forEach((o) => o.blur());
useGameStore.getState().setFocusedObject(null);
```

- **Expected:** After SHUTDOWN no object is focused and the store focus id is null.

## Acceptance criteria
- All objects blurred
- Store focus null

## Definition of done
- Shutdown clears focus; tsc passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-718.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-144
- Requirement: REQ-360
- Unit (Act): UNIT-718
- Unit (Verify): UNIT-721
- Status: approved
- Change: UPDATE
