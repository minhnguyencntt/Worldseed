# UNIT-729 — Verify: Null store focus clears scene focus unit tests

## Summary
Unit test that null store focus blurs focused objects

## Description
Write Phaser-mocked unit tests proving REQ-2.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/bootSceneFocus.test.ts` · `new: it('blurs focused objects when focusedObjectId is null')` · after the VER-1 test
- **Do:** Create a fake bookshelf with isFocused:true, call create(), set the store focus to 'bookshelf' then to null via setFocusedObject(null). Assert bookshelf.blur toHaveBeenCalledTimes(1).
- **Run:** `cd game/frontend && npx vitest run tests/bootSceneFocus.test.ts -t 'blurs focused objects'`
- **Expected:** Test passes: blur called once after null

### Step 2 — `game/frontend/tests/bootSceneFocus.test.ts` · `new: it('does nothing when no object is focused and focus is null')` · after the previous test
- **Do:** Create a fake with isFocused:false, call create(), call setFocusedObject(null) on a store whose focusedObjectId is already null plus a call via setState. Assert focus and blur are not called.
- **Run:** `cd game/frontend && npx vitest run tests/bootSceneFocus.test.ts -t 'does nothing when no object'`
- **Expected:** Test passes: neither focus nor blur called

## Acceptance criteria
- Setting focusedObjectId null blurs a focused object
- No focus or blur call when nothing is focused and id is null

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-729.md`

## Links
- Evidence: EVD-146
- Requirement: REQ-364
- Unit (Act): UNIT-727
- Unit (Verify): UNIT-729
- Status: approved
- Change: UPDATE
