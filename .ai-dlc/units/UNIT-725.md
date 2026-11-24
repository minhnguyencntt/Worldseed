# UNIT-725 — Verify: setFocusedObject unit tests

## Summary
Unit tests prove setFocusedObject sets, clears and leaves state untouched

## Description
Add unit tests on the real store for the setter action in the same test file.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/gameStoreFocus.test.ts` · `it('setFocusedObject stores the id')` · after the init test
- **Do:** Add a test calling useGameStore.getState().setFocusedObject('bookshelf') and asserting focusedObjectId toBe('bookshelf').
- **Run:** `npx vitest run tests/gameStoreFocus.test.ts -t "stores the id"`
- **Expected:** Test passes

### Step 2 — `game/frontend/tests/gameStoreFocus.test.ts` · `it('setFocusedObject(null) clears focus')` · after the previous test
- **Do:** Add a test that sets 'bookshelf', then calls setFocusedObject(null), and asserts focusedObjectId toBeNull().
- **Run:** `npx vitest run tests/gameStoreFocus.test.ts -t "clears focus"`
- **Expected:** Test passes

### Step 3 — `game/frontend/tests/gameStoreFocus.test.ts` · `it('setFocusedObject leaves state untouched')` · after the previous test
- **Do:** Add a test that inits with createInitialState(world, scene), captures before = useGameStore.getState().state, calls setFocusedObject('door'), and asserts useGameStore.getState().state toBe(before).
- **Run:** `npx vitest run tests/gameStoreFocus.test.ts -t "leaves state untouched"`
- **Expected:** Test passes

## Acceptance criteria
- Setting 'bookshelf' stores it
- Setting null clears it
- State object identity is unchanged

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-725.md`

## Links
- Evidence: EVD-145
- Requirement: REQ-362
- Unit (Act): UNIT-723
- Unit (Verify): UNIT-725
- Status: completed
- Change: UPDATE
