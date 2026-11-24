# UNIT-716 — Act: Add focusedObjectId and setFocusedObject to gameStore

## Summary
Extend GameStoreState and the zustand creator with focus field and action

## Description
Add a focusedObjectId field defaulting to null and a setFocusedObject action to useGameStore in gameStore.ts without changing init or setState.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/store/gameStore.ts` · `GameStoreState` · L4-L8
- **Do:** Add the fields focusedObjectId: string | null and setFocusedObject: (id: string | null) => void to the interface after init.

```
focusedObjectId: string | null;
  setFocusedObject: (id: string | null) => void;
```

- **Expected:** Interface declares the focus field and action.

### Step 2 — `game/frontend/src/store/gameStore.ts` · `useGameStore` · L15-L30
- **Do:** In the create callback add focusedObjectId: null as the default and setFocusedObject: (id) => set({ focusedObjectId: id }) after the init entry.

```
focusedObjectId: null,
  setFocusedObject: (id) => set({ focusedObjectId: id }),
```

- **Expected:** useGameStore.getState().focusedObjectId is null and setFocusedObject updates it.

## Acceptance criteria
- focusedObjectId defaults to null
- setFocusedObject sets the value

## Definition of done
- Interface and creator updated; tsc passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-716.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-144
- Requirement: REQ-358
- Unit (Act): UNIT-716
- Unit (Verify): UNIT-719
- Status: approved
- Change: NEW
