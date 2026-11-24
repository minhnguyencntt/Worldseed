# UNIT-730 — Act: Add applyFocusedObject to BootScene and call it from onStateChange

## Summary
Focus the SceneObject matching the store focusedObjectId

## Description
Add a private applyFocusedObject(id) method to BootScene that focuses the matching object and blurs other focused objects, and call it from onStateChange after the sync loop.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/phaser/BootScene.ts` · `new: BootScene.applyFocusedObject` · after L134
- **Do:** Add private method applyFocusedObject(id: string | null): void. For each o in this.sceneObjects: if id !== null and o.spec.id === id and !o.isFocused call o.focus(); else if o.spec.id !== id and o.isFocused call o.blur().

```
private applyFocusedObject(id: string | null): void {
  this.sceneObjects.forEach((o) => {
    if (id !== null && o.spec.id === id) {
      if (!o.isFocused) o.focus();
    } else if (o.isFocused) o.blur();
  });
}
```

- **Expected:** Method exists and focuses only the matching object

### Step 2 — `game/frontend/src/phaser/BootScene.ts` · `BootScene.onStateChange` · L130-L134
- **Do:** After the this.sceneObjects.forEach((o) => o.sync(state)) line, add a call this.applyFocusedObject(useGameStore.getState().focusedObjectId).

```
this.sceneObjects.forEach((o) => o.sync(state));
+ this.applyFocusedObject(useGameStore.getState().focusedObjectId);
```

- **Expected:** Every store change re-applies the store focus to scene objects

## Acceptance criteria
- onStateChange reads useGameStore.getState().focusedObjectId and passes it to applyFocusedObject
- Matching object gets focus(); other focused objects get blur()

## Definition of done
- BootScene compiles with tsc --noEmit
- Method wired in onStateChange
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-730.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-147
- Requirement: REQ-365
- Unit (Act): UNIT-730
- Unit (Verify): UNIT-732
- Status: completed
- Change: UPDATE
