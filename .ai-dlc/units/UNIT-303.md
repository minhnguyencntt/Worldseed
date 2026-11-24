# UNIT-303 — Verify: Typed useUiStore hook export unit tests

## Summary
Unit tests that the hook is exported and works with selectors in React.

## Description
Render a probe component using selectors and assert re-render on action.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/uiStoreHook.test.tsx` · `new: describe('useUiStore hook')` · new
- **Do:** Create a test importing { useUiStore } and types from '../src/store/uiStore'; render a Probe using useUiStore(s => s.soundEnabled) showing text 'sound:true'; wrap useUiStore.getState().toggleSound() in act and assert 'sound:false' appears; cleanup after each.
- **Run:** `cd game/frontend && npx vitest run tests/uiStoreHook.test.tsx`
- **Expected:** All tests pass

## Acceptance criteria
- Selector renders current value
- Re-renders after action

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-303.md`

## Links
- Evidence: EVD-060
- Requirement: REQ-151
- Unit (Act): UNIT-300
- Unit (Verify): UNIT-303
- Status: completed
- Change: UPDATE
