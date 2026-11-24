# UNIT-722 — Act: Add focusedObjectId field to gameStore

## Summary
Declare and default focusedObjectId in GameStoreState and the store

## Description
Edit game/frontend/src/store/gameStore.ts to add the focusedObjectId field typed string | null with initial value null.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/store/gameStore.ts` · `GameStoreState` · L4-L8
- **Do:** Add the property focusedObjectId: string | null to the GameStoreState interface after the state property.

```
focusedObjectId: string | null;
```

- **Expected:** Interface declares the focusedObjectId property

### Step 2 — `game/frontend/src/store/gameStore.ts` · `useGameStore` · L15-L16
- **Do:** Add focusedObjectId: null to the object returned by create, directly after state: null.

```
state: null,
  focusedObjectId: null,
```

- **Expected:** Fresh store reports focusedObjectId === null

## Acceptance criteria
- GameStoreState declares focusedObjectId: string | null
- The store initial value for focusedObjectId is null

## Definition of done
- Field present and defaulted; tsc passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-722.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-145
- Requirement: REQ-361
- Unit (Act): UNIT-722
- Unit (Verify): UNIT-724
- Status: completed
- Change: UPDATE
