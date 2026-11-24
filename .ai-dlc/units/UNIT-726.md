# UNIT-726 — Act: Add applyFocusedObject to BootScene to focus the matching object

## Summary
Add private applyFocusedObject(id) that focuses the matching SceneObject

## Description
Add a private method to BootScene that focuses the SceneObject whose spec.id equals the given id, reusing SceneObject.focus().

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/phaser/BootScene.ts` · `new: BootScene.applyFocusedObject` · after L134
- **Do:** Add a private method applyFocusedObject(id: string | null): void that loops over this.sceneObjects and, for the object whose spec.id === id and that is not already isFocused, calls o.focus().

```
private applyFocusedObject(id: string | null): void {
  this.sceneObjects.forEach((o) => {
    if (id !== null && o.spec.id === id && !o.isFocused) o.focus();
  });
}
```

- **Expected:** BootScene compiles and the method focuses only the object with the given id

## Acceptance criteria
- applyFocusedObject('bookshelf') calls focus() on the object with spec.id 'bookshelf'
- Objects with other ids are not focused by it

## Definition of done
- Method exists and type-checks
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-726.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-146
- Requirement: REQ-363
- Unit (Act): UNIT-726
- Unit (Verify): UNIT-728
- Status: approved
- Change: UPDATE
