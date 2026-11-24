# UNIT-715 — Verify: menuClose closes the ActionMenu and unsubscribes on unmount

## Summary
App test for menuClose

## Description
New App test mirroring appObjectClick.test.tsx.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/appMenuClose.test.tsx` · `new: describe('App menuClose')` · new
- **Do:** Reuse the setup of appObjectClick.test.tsx to reach the playing view. Test 1: act(() => phaserToReact.emit('objectClick',{id:<object id used in appObjectClick>})), assert ActionMenu present, act(() => phaserToReact.emit('menuClose',{})), assert ActionMenu absent. Test 2: spy on phaserToReact.on, unmount, assert the returned unsubscribe was invoked or that a later menuClose emit causes no state update.
- **Run:** `cd game/frontend && npx vitest run tests/appMenuClose.test.tsx`
- **Expected:** Both tests pass.

## Acceptance criteria
- After objectClick the menu is shown; after menuClose it is gone.
- Unmount removes the handler.

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-715.md`

## Links
- Evidence: EVD-143
- Requirement: REQ-357
- Unit (Act): UNIT-712
- Unit (Verify): UNIT-715
- Status: completed
- Change: UPDATE
