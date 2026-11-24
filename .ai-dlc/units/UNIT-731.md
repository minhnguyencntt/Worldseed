# UNIT-731 — Act: Confirm null focusedObjectId blurs every focused object in applyFocusedObject

## Summary
Ensure the null branch clears focus without emitting events or writing the store

## Description
Confirm applyFocusedObject treats null as no match so every focused SceneObject is blurred, and that it neither emits focusChange nor calls setFocusedObject.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/phaser/BootScene.ts` · `BootScene.applyFocusedObject` · after L134
- **Do:** Read applyFocusedObject and confirm that when id is null the condition id !== null is false so the else-if blurs every object where o.isFocused is true; add the comment line '// A null id matches nothing, so every focused object is blurred.' above the forEach and make no other change.

```
// A null id matches nothing, so every focused object is blurred.
```

- **Expected:** Comment present; null path blurs all focused objects; no emit or setFocusedObject in the method

## Acceptance criteria
- With id null every focused object receives blur()
- applyFocusedObject does not call phaserToReact.emit or setFocusedObject

## Definition of done
- Null branch clears focus; no event or store write in applyFocusedObject
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-731.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-147
- Requirement: REQ-366
- Unit (Act): UNIT-731
- Unit (Verify): UNIT-733
- Status: completed
- Change: UPDATE
