# UNIT-723 — Act: Add setFocusedObject action to gameStore

## Summary
Add the setFocusedObject action that writes focusedObjectId

## Description
Edit game/frontend/src/store/gameStore.ts to declare and implement setFocusedObject(id: string | null) which sets focusedObjectId only.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/store/gameStore.ts` · `GameStoreState` · L4-L8
- **Do:** Add the member setFocusedObject: (id: string | null) => void to the GameStoreState interface after init.

```
setFocusedObject: (id: string | null) => void;
```

- **Expected:** Interface declares setFocusedObject

### Step 2 — `game/frontend/src/store/gameStore.ts` · `useGameStore` · after L28
- **Do:** Add the setFocusedObject implementation to the store object after init, calling set with a partial update of focusedObjectId.

```
setFocusedObject: (id) => {
    set({ focusedObjectId: id });
  },
```

- **Expected:** Calling setFocusedObject('x') makes focusedObjectId 'x'

## Acceptance criteria
- setFocusedObject(id) sets focusedObjectId to id
- setFocusedObject(null) clears it and leaves state untouched

## Definition of done
- Action present and typed; tsc passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-723.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-145
- Requirement: REQ-362
- Unit (Act): UNIT-723
- Unit (Verify): UNIT-725
- Status: completed
- Change: UPDATE
