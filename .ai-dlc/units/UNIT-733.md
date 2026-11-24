# UNIT-733 — Verify: Null store focus clears scene focus unit tests

## Summary
Phaser-mocked tests for clearing focus on null

## Description
TDD unit tests proving that setting focusedObjectId to null removes highlight and label (blur) from focused objects.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/bootSceneFocusClear.test.ts` · `new: BootScene store focus clear` · new
- **Do:** Create the file with the same vi.mock block as bootSceneKeyboard.test.ts and one fake object (spec.id 'bookshelf', focus/blur vi.fn(), mutable isFocused). Call boot.create() and reset the store with setFocusedObject(null) in beforeEach.
- **Run:** `cd game/frontend && npx vitest run tests/bootSceneFocusClear.test.ts`
- **Expected:** File loads

### Step 2 — `game/frontend/tests/bootSceneFocusClear.test.ts` · `it('clears focus when focusedObjectId becomes null')` · new
- **Do:** Call setFocusedObject('bookshelf'), set fake.isFocused = true, call setFocusedObject(null); assert fake.blur called once.
- **Run:** `cd game/frontend && npx vitest run tests/bootSceneFocusClear.test.ts -t 'clears focus'`
- **Expected:** Test passes

### Step 3 — `game/frontend/tests/bootSceneFocusClear.test.ts` · `it('does not blur when nothing is focused')` · new
- **Do:** With fake.isFocused = false call setFocusedObject('x') then setFocusedObject(null); assert fake.blur not called.
- **Run:** `cd game/frontend && npx vitest run tests/bootSceneFocusClear.test.ts`
- **Expected:** All tests in the file pass

## Acceptance criteria
- Null focusedObjectId blurs a focused object
- Null with nothing focused makes no blur call

## Definition of done
- Test file passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-733.md`

## Links
- Evidence: EVD-147
- Requirement: REQ-366
- Unit (Act): UNIT-731
- Unit (Verify): UNIT-733
- Status: completed
- Change: NEW
