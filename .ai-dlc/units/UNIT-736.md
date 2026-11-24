# UNIT-736 — Verify: Shutdown clears scene and store focus unit tests

## Summary
Unit tests that shutdown blurs objects and nulls the store id.

## Description
Add tests/bootSceneShutdownFocus.test.ts using the Phaser/content/buildScene mocks from tests/bootSceneFocusClear.test.ts.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/bootSceneShutdownFocus.test.ts` · `new: BootScene shutdown focus removal` · new
- **Do:** Copy the vi.mock blocks and makeFakeObject from tests/bootSceneFocusClear.test.ts. Test 'blurs focused object and nulls store id': set fake.isFocused = true, setState focusedObjectId 'bookshelf', boot.create(), find the 'shutdown' call in events.once.mock.calls and invoke it; assert fake.blur called once and useGameStore.getState().focusedObjectId === null. Test 'no focus': isFocused false, focusedObjectId null; invoke shutdown; assert blur not called and id null.
- **Run:** `cd game/frontend && npx vitest run tests/bootSceneShutdownFocus.test.ts`
- **Expected:** Both tests pass.

## Acceptance criteria
- Focused object is blurred and store id null after shutdown.
- No-focus case leaves state null.

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-736.md`

## Links
- Evidence: EVD-148
- Requirement: REQ-367
- Unit (Act): UNIT-734
- Unit (Verify): UNIT-736
- Status: approved
- Change: UPDATE
