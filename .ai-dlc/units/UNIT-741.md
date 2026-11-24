# UNIT-741 — Verify: Store focus is null when nothing focused and apply is a no-op

## Summary
Unit tests for null focus and non-blurring apply

## Description
Add bootSceneKeyboardStoreNull.test.ts with the same mocks; set the fake object isFocused false and true in separate cases.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/bootSceneKeyboardStoreNull.test.ts` · `new: BootScene keyboard store null and apply` · new
- **Do:** Reuse mocks from tests/bootSceneKeyboard.test.ts; add blur: vi.fn() and focus: vi.fn() to the fake object. Test 1: fake.isFocused=false, press('Tab'), expect store focusedObjectId toBeNull and emit calledWith('focusChange',{id:null}). Test 2: seed useGameStore state with createInitialState(worldFixture, sceneSpecFixture) as in bootSceneFocusApply.test.ts, fake.isFocused=true, press('Tab'), expect fake.blur not called.
- **Run:** `cd game/frontend && npx vitest run tests/bootSceneKeyboardStoreNull.test.ts`
- **Expected:** Both tests pass.

## Acceptance criteria
- With no focused object, Tab leaves store focusedObjectId null and emits focusChange id null.
- With a focused object and non-null game state, Tab does not call blur on the object.

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-741.md`

## Links
- Evidence: EVD-149
- Requirement: REQ-370
- Unit (Act): UNIT-739
- Unit (Verify): UNIT-741
- Status: completed
- Change: UPDATE
