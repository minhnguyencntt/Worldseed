# UNIT-724 — Verify: focusedObjectId default unit tests

## Summary
Unit tests prove focusedObjectId defaults to null and survives init

## Description
Write unit tests against the real useGameStore asserting the default focus value.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/gameStoreFocus.test.ts` · `new: describe('gameStore focus') › it('focusedObjectId defaults to null')` · new
- **Do:** Create the file importing useGameStore from '../src/store/gameStore'; add beforeEach calling useGameStore.setState({ state: null, focusedObjectId: null }); add test reading useGameStore.getState().focusedObjectId and asserting toBeNull().

```
expect(useGameStore.getState().focusedObjectId).toBeNull();
```

- **Run:** `npx vitest run tests/gameStoreFocus.test.ts -t "defaults to null"`
- **Expected:** Test passes with focusedObjectId null

### Step 2 — `game/frontend/tests/gameStoreFocus.test.ts` · `it('init leaves focusedObjectId null')` · after the default test
- **Do:** Add a test that calls useGameStore.getState().init(createInitialState(world, scene)) using createInitialState from '@game/state/gameState' and world, scene from '../src/runtime/content', then asserts focusedObjectId toBeNull().
- **Run:** `npx vitest run tests/gameStoreFocus.test.ts -t "init leaves"`
- **Expected:** Test passes

## Acceptance criteria
- Fresh store focusedObjectId is null
- After init the value is still null

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-724.md`

## Links
- Evidence: EVD-145
- Requirement: REQ-361
- Unit (Act): UNIT-722
- Unit (Verify): UNIT-724
- Status: completed
- Change: UPDATE
