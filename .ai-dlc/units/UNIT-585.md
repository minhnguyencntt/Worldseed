# UNIT-585 — Verify: Persistence, restore and secret door re-entry unit tests

## Summary
Round trip, strict validation and door stays open

## Description
Unit tests for save validation, restore via useGame and scene view.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/tests/persistenceStrict.test.ts` · `new: describe deserializeState element validation` · new
- **Do:** Assert serialize/deserialize round trip keeps flags.secret_door_open true; JSON with inventory [1] throws 'Invalid game state: inventory'; flags {a:'x'} throws; relationships {a:'x'} throws.
- **Run:** `cd game && npx vitest run tests/persistenceStrict.test.ts`
- **Expected:** All persistence assertions pass

### Step 2 — `game/frontend/tests/secretDoorPersistence.test.tsx` · `new: secret door stays open` · new
- **Do:** renderHook(useGame): getSceneView lacks secret-door-open; act('bookshelf','search'); view has it; apply applyEvent goto_scene away and back via store setState and assert flag and view unchanged; unmount, remount and assert view still has it; with localStorage getItem returning '{bad' assert fresh state.
- **Run:** `cd game/frontend && npx vitest run tests/secretDoorPersistence.test.tsx`
- **Expected:** All secret door assertions pass

## Acceptance criteria
- Door visible only when flag true
- Corrupt element types rejected
- Door open after remount and goto_scene round trip

## Definition of done
- Tests green
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-585.md`

## Links
- Evidence: EVD-116
- Requirement: REQ-292
- Unit (Act): UNIT-581
- Unit (Verify): UNIT-585
- Status: completed
- Change: UPDATE
