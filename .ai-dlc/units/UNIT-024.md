# UNIT-024 — Verify: State persistence unit tests

## Summary
Tests for round trip and persisted open secret door

## Description
Test serialization and the bookshelf door persistence using real bedroom content read from disk.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/game/tests/persistence.test.ts` · `new: round trip and invalid input tests` · new
- **Do:** Add 'round trip equals original' (state with flags {a:true}, inventory ['key']; expect deserializeState(serializeState(s)) toEqual s) and 'invalid input throws' (inputs '{}' and 'not json'; expect toThrow).
- **Run:** `cd backend/game && npx vitest run tests/persistence.test.ts -t 'round trip|invalid'`
- **Expected:** Tests pass.

### Step 2 — `backend/game/tests/persistence.test.ts` · `new: secret door persists` · new
- **Do:** Add test 'secret door stays open after restore': loadWorld the-boys-room content, createInitialState, performAction(bookshelf,'search'), restore via deserializeState(serializeState(...)), assert getSceneView(...).objects.find(o=>o.id==='bookshelf').open is true.
- **Run:** `cd backend/game && npx vitest run tests/persistence.test.ts -t 'secret door'`
- **Expected:** Test passes.

## Acceptance criteria
- Given round trip, then deep equality.
- Given restored state, then bookshelf open is true.

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-024.md`

## Links
- Evidence: EVD-004
- Requirement: REQ-011
- Requirement: REQ-012
- Unit (Act): UNIT-019
- Unit (Act): UNIT-020
- Unit (Verify): UNIT-024
- Status: completed
- Change: UPDATE
