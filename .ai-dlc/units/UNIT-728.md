# UNIT-728 — Verify: Store focus focuses the matching scene object unit tests

## Summary
Unit test that a store focus value focuses the matching object

## Description
Write a Phaser-mocked unit test proving REQ-1.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/bootSceneFocus.test.ts` · `new: describe('BootScene store focus') it('focuses the object matching focusedObjectId')` · new
- **Do:** Copy the vi.mock block and BootScene create() setup from tests/bootSceneKeyboard.test.ts. Build two fake objects {spec:{id:'bookshelf'}, isFocused:false, focus, blur, sync, destroy, onInteract, handleKey} and {spec:{id:'bed'}, ...}. Return both from the mocked buildScene, call create(), then call useGameStore.getState().setFocusedObject('bookshelf'). Assert bookshelf.focus toHaveBeenCalledTimes(1) and bed.focus not.toHaveBeenCalled().
- **Run:** `cd game/frontend && npx vitest run tests/bootSceneFocus.test.ts -t 'focuses the object matching'`
- **Expected:** Test passes: only the bookshelf fake is focused

## Acceptance criteria
- Setting focusedObjectId 'bookshelf' calls focus() on the bookshelf fake only
- The 'bed' fake's focus() is not called when focusedObjectId is 'bookshelf'

## Definition of done
- Test passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-728.md`

## Links
- Evidence: EVD-146
- Requirement: REQ-363
- Unit (Act): UNIT-726
- Unit (Verify): UNIT-728
- Status: approved
- Change: UPDATE
