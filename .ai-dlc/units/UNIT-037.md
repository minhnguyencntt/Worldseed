# UNIT-037 — Verify: useGame persistence and storage fallback unit tests

## Summary
Verify: useGame persistence and storage fallback unit tests

## Description
Unit tests written from the requirement spec with storage and DOM faked via jsdom; no server or browser is started.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/setup.ts` · `new: setup` · new
- **Do:** Create setup importing '@testing-library/jest-dom/vitest' and an afterEach calling localStorage.clear() and vi.restoreAllMocks().
- **Run:** `cd game/frontend && npx vitest run tests/useGame.test.tsx`
- **Expected:** Setup loads

### Step 2 — `game/frontend/tests/useGame.test.tsx` · `persists state across remount` · new
- **Do:** With renderHook(useGame), call act('bookshelf','search'), unmount, renderHook again; assert result.current.state.flags.secret_door_open===true.
- **Run:** `cd game/frontend && npx vitest run tests/useGame.test.tsx -t remount`
- **Expected:** Test passes

### Step 3 — `game/frontend/tests/useGame.test.tsx` · `storage failure fallback` · new
- **Do:** Spy on Storage.prototype.setItem to throw Error; renderHook(useGame), call act('bookshelf','search'); assert no throw and flags.secret_door_open===true. Also set getItem to return '{bad' and assert initial activeDialogue==='intro'.
- **Run:** `cd game/frontend && npx vitest run tests/useGame.test.tsx -t fallback`
- **Expected:** Test passes

## Acceptance criteria
- Tests fail without the Act and pass with it
- Each test maps to a requirement acceptance criterion

## Definition of done
- Listed tests pass in seconds
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-037.md`

## Links
- Evidence: EVD-007
- Requirement: REQ-017
- Unit (Act): UNIT-033
- Unit (Verify): UNIT-037
- Status: completed
- Change: UPDATE
