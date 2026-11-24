# UNIT-739 — Act: Extract a single focused-id helper in BootScene

## Summary
Use one private helper for the store write and the event payload

## Description
Replace the inline focused-id lookup in onKeyDown with a private focusedObjectIdFromScene method returning string | null.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/phaser/BootScene.ts` · `new: BootScene.focusedObjectIdFromScene` · after L152
- **Do:** Add a private method focusedObjectIdFromScene(): string | null returning this.sceneObjects.find((o) => o.isFocused)?.spec.id ?? null.

```
private focusedObjectIdFromScene(): string | null { return this.sceneObjects.find((o) => o.isFocused)?.spec.id ?? null; }
```

- **Expected:** Method exists and compiles.

### Step 2 — `game/frontend/src/phaser/BootScene.ts` · `BootScene.onKeyDown` · L143-L152
- **Do:** Replace the inline find in the delta branch with `const id = this.focusedObjectIdFromScene();` and use id for setFocusedObject and the focusChange emit.

```
const id = this.focusedObjectIdFromScene();
```

- **Expected:** Store write and event share one computed id.

## Acceptance criteria
- Helper returns null when no object isFocused.
- Store write and event use the helper result.

## Definition of done
- onKeyDown calls the helper once per move
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-739.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-149
- Requirement: REQ-370
- Unit (Act): UNIT-739
- Unit (Verify): UNIT-741
- Status: completed
- Change: UPDATE
