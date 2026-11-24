# UNIT-717 — Act: Apply store focus to SceneObjects and write it from the keyboard handler

## Summary
Add applyFocus to BootScene.onStateChange and setFocusedObject to onKeyDown

## Description
BootScene reads focusedObjectId on every store change and focuses the matching SceneObject, blurring the others. The Tab/arrow branch of onKeyDown stores the focused id.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/phaser/BootScene.ts` · `BootScene.onStateChange` · L130-L134
- **Do:** At the top of onStateChange, before the null-state return, read focusedObjectId from useGameStore.getState() and loop this.sceneObjects: if o.spec.id === focusedObjectId call o.focus(), else if o.isFocused call o.blur().

```
const focusedId = useGameStore.getState().focusedObjectId;
this.sceneObjects.forEach((o) => {
  if (o.spec.id === focusedId) o.focus();
  else if (o.isFocused) o.blur();
});
```

- **Expected:** Changing the store focus id focuses exactly the matching object.

### Step 2 — `game/frontend/src/phaser/BootScene.ts` · `BootScene.onKeyDown` · L136-L142
- **Do:** In the delta !== 0 branch, after moveFocus, compute const focusedId = this.sceneObjects.find((o) => o.isFocused)?.spec.id ?? null; call useGameStore.getState().setFocusedObject(focusedId) and reuse focusedId in the existing focusChange emit.

```
const focusedId = this.sceneObjects.find((o) => o.isFocused)?.spec.id ?? null;
useGameStore.getState().setFocusedObject(focusedId);
phaserToReact.emit('focusChange', { id: focusedId });
```

- **Expected:** Tab stores the focused id and still emits focusChange.

## Acceptance criteria
- Matching object focused, others blurred
- Keyboard focus writes the store

## Definition of done
- Store focus drives highlight; tsc passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-717.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-144
- Requirement: REQ-359
- Unit (Act): UNIT-717
- Unit (Verify): UNIT-720
- Status: approved
- Change: UPDATE
