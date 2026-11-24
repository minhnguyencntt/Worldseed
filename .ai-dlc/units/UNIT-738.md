# UNIT-738 — Act: Write store focus from BootScene.onKeyDown

## Summary
Call setFocusedObject after moveFocus in the keyboard handler

## Description
In BootScene.onKeyDown, after moveFocus, write the focused id to useGameStore via setFocusedObject, before emitting focusChange.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/phaser/BootScene.ts` · `BootScene.onKeyDown` · L143-L152
- **Do:** Inside the `if (delta !== 0)` branch, compute `const id = this.sceneObjects.find((o) => o.isFocused)?.spec.id ?? null;` after moveFocus, call useGameStore.getState().setFocusedObject(id), then emit focusChange with { id }.

```
moveFocus(...); const id = this.sceneObjects.find((o) => o.isFocused)?.spec.id ?? null; useGameStore.getState().setFocusedObject(id); phaserToReact.emit('focusChange', { id });
```

- **Expected:** A Tab press sets the store focusedObjectId and still emits focusChange with the same id.

## Acceptance criteria
- Tab press leaves store focusedObjectId equal to the focused object id.
- focusChange is still emitted.

## Definition of done
- onKeyDown writes store focus on Tab, Shift+Tab, arrows
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-738.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-149
- Requirement: REQ-369
- Unit (Act): UNIT-738
- Unit (Verify): UNIT-740
- Status: completed
- Change: UPDATE
