# UNIT-732 — Verify: Store focus focuses the matching scene object unit tests

## Summary
Phaser-mocked tests for applying store focus

## Description
TDD unit tests proving that setting focusedObjectId focuses and labels the matching object through SceneObject.focus().

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/bootSceneFocusApply.test.ts` · `new: BootScene store focus apply` · new
- **Do:** Create the file copying the vi.mock block and beforeEach from bootSceneKeyboard.test.ts. Build two fake objects {id:'bookshelf'} and {id:'bed'} with sync, destroy, onInteract, handleKey, focus, blur vi.fn() and a mutable isFocused, spec.id. buildScene mockReturnValue returns both; call boot.create().
- **Run:** `cd game/frontend && npx vitest run tests/bootSceneFocusApply.test.ts`
- **Expected:** File loads and setup runs

### Step 2 — `game/frontend/tests/bootSceneFocusApply.test.ts` · `it('focuses the object matching focusedObjectId')` · new
- **Do:** Call useGameStore.getState().setFocusedObject('bookshelf'); assert bookshelf.focus called once and bed.focus not called.
- **Run:** `cd game/frontend && npx vitest run tests/bootSceneFocusApply.test.ts -t 'focuses the object matching'`
- **Expected:** Test passes

### Step 3 — `game/frontend/tests/bootSceneFocusApply.test.ts` · `it('blurs a previously focused object and ignores unknown ids')` · new
- **Do:** Set bed.isFocused = true, call setFocusedObject('bookshelf'); assert bed.blur called. Then setFocusedObject('missing'); assert no further focus() calls and no throw.
- **Run:** `cd game/frontend && npx vitest run tests/bootSceneFocusApply.test.ts`
- **Expected:** All tests in the file pass

## Acceptance criteria
- Setting focusedObjectId to an object id calls focus() on it
- A different focused object is blurred
- Unknown id focuses nothing

## Definition of done
- Test file passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-732.md`

## Links
- Evidence: EVD-147
- Requirement: REQ-365
- Unit (Act): UNIT-730
- Unit (Verify): UNIT-732
- Status: completed
- Change: NEW
