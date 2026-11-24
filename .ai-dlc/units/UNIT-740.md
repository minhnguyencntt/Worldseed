# UNIT-740 — Verify: Keyboard moves write the store focusedObjectId unit tests

## Summary
Unit tests for store writes on Tab, Shift+Tab and arrows

## Description
Add bootSceneKeyboardStore.test.ts reusing the Phaser, content, buildScene and moveFocus mocks from tests/bootSceneKeyboard.test.ts.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/bootSceneKeyboardStore.test.ts` · `new: BootScene keyboard store focus` · new
- **Do:** Copy the vi.mock blocks and beforeEach setup from tests/bootSceneKeyboard.test.ts. Add tests: press('Tab') then expect useGameStore.getState().focusedObjectId toBe 'bookshelf'; press('Tab', true) and press('ArrowLeft') spy on setFocusedObject via vi.spyOn(useGameStore.getState(), 'setFocusedObject') and expect calledWith 'bookshelf'; expect emit toHaveBeenCalledWith('focusChange', { id: 'bookshelf' }).
- **Run:** `cd game/frontend && npx vitest run tests/bootSceneKeyboardStore.test.ts`
- **Expected:** All tests in the file pass.

## Acceptance criteria
- Tab sets store focusedObjectId to 'bookshelf'.
- Shift+Tab and ArrowLeft call setFocusedObject with 'bookshelf'.
- focusChange still emitted.

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-740.md`

## Links
- Evidence: EVD-149
- Requirement: REQ-369
- Unit (Act): UNIT-738
- Unit (Verify): UNIT-740
- Status: completed
- Change: UPDATE
