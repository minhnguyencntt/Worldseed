# UNIT-487 — Verify: Keyboard focus and activation unit tests

## Summary
Unit tests for focus, handleKey and moveFocus

## Description
Add tests to tests/sceneObject.test.ts and tests/buildScene.test.ts using fake render contexts.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/tests/sceneObject.test.ts` · `new: it('activates with Enter and Space only when focused')` · after the last it()
- **Do:** Using the extended fake context, sync a visible state, register onInteract mock; handleKey('Enter') -> 0 calls; focus(); handleKey('Enter'), handleKey(' ') -> 2 calls; handleKey('a') -> still 2; blur() then assert last setHighlighted call is [false] and last setLabelVisible call is [false]
- **Run:** `cd game && npx vitest run tests/sceneObject.test.ts -t 'Enter and Space'`
- **Expected:** Call counts as stated

### Step 2 — `game/tests/buildScene.test.ts` · `new: it('moveFocus skips hidden objects and wraps')` · after the last it()
- **Do:** Build three SceneObjects with a fake context, sync a state where the second is hidden via visibleWhen; call moveFocus(objs,1) twice and assert isFocused on objs[0] then objs[2]; a third call wraps to objs[0]; moveFocus(objs,-1) from objs[0] focuses objs[2]
- **Run:** `cd game && npx vitest run tests/buildScene.test.ts -t 'moveFocus'`
- **Expected:** Focus order 0,2,0 and reverse wrap to 2

## Acceptance criteria
- Enter/Space emit only when focused
- moveFocus skips hidden and wraps
- blur clears highlight

## Definition of done
- Both test files pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-487.md`

## Links
- Evidence: EVD-097
- Requirement: REQ-243
- Unit (Act): UNIT-484
- Unit (Verify): UNIT-487
- Status: completed
- Change: UPDATE
