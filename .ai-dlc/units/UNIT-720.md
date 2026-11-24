# UNIT-720 — Verify: store focus drives scene highlight unit tests

## Summary
Phaser-mocked BootScene tests for focus sync and keyboard store write

## Description
Mock phaser, content and buildScene as in bootSceneKeyboard.test.ts. Fakes expose focus, blur, sync, destroy, onInteract, handleKey, isFocused, spec. Update existing bootScene* test fakes that lack focus and blur if they now fail.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/bootSceneFocusSync.test.ts` · `new: BootScene store focus sync` · new
- **Do:** Copy the vi.mock blocks and BootScene create setup from bootSceneKeyboard.test.ts. Build two fakes (bookshelf, bed) with focus: vi.fn(), blur: vi.fn(), isFocused false. Test 1: useGameStore.setState({ focusedObjectId: 'bed' }) then assert bed.focus called once and bookshelf.focus not called. Test 2: set bed.isFocused true, setState({ focusedObjectId: null }), assert bed.blur called. Test 3: press Tab via the registered keydown handler with moveFocus mocked and bookshelf.isFocused true, assert useGameStore.getState().focusedObjectId equals 'bookshelf' and phaserToReact.emit called with focusChange.
- **Run:** `cd game/frontend && npx vitest run tests/bootSceneFocusSync.test.ts tests/bootSceneKeyboard.test.ts`
- **Expected:** New tests pass and the keyboard suite stays green.

## Acceptance criteria
- Store change focuses matching object
- Null id blurs
- Tab writes store

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-720.md`

## Links
- Evidence: EVD-144
- Requirement: REQ-359
- Unit (Act): UNIT-717
- Unit (Verify): UNIT-720
- Status: approved
- Change: UPDATE
