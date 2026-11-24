# UNIT-040 — Verify: GameLayout drawer toggle and styles unit tests

## Summary
Verify: GameLayout drawer toggle and styles unit tests

## Description
Unit tests written from the requirement spec with storage and DOM faked via jsdom; no server or browser is started.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/layout.test.tsx` · `drawer toggle` · new
- **Do:** Render GameLayout with simple scene and story nodes; click button 'Story'; assert aria-expanded 'true'; click again; assert 'false'. Assert the scene node stays in the document throughout. Read src/styles.css with fs and assert it contains 'overflow-y: auto' and '@media (max-width: 768px)'.
- **Run:** `cd game/frontend && npx vitest run tests/layout.test.tsx`
- **Expected:** Test passes

## Acceptance criteria
- Tests fail without the Act and pass with it
- Each test maps to a requirement acceptance criterion

## Definition of done
- Listed tests pass in seconds
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-040.md`

## Links
- Evidence: EVD-007
- Requirement: REQ-020
- Unit (Act): UNIT-036
- Unit (Verify): UNIT-040
- Status: completed
- Change: UPDATE
