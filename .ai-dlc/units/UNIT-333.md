# UNIT-333 — Verify: GameLayout header slot unit tests

## Summary
Unit tests for header slot.

## Description
Add tests asserting header placement and absence.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/layout.test.tsx` · `describe('GameLayout header slot')` · after L1
- **Do:** Add a test rendering GameLayout with header=<div data-testid="hdr"/>, scene and story nodes; assert screen.getByTestId('hdr').closest('main') is non-null and contains getByTestId of the scene node. Add a second test rendering without header and asserting the Story button and scene node render.
- **Run:** `cd game/frontend && npx vitest run tests/layout.test.tsx`
- **Expected:** Both new tests pass.

## Acceptance criteria
- Header is inside main when passed.
- No header leaves layout intact.

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-333.md`

## Links
- Evidence: EVD-066
- Requirement: REQ-165
- Unit (Act): UNIT-330
- Unit (Verify): UNIT-333
- Status: completed
- Change: UPDATE
