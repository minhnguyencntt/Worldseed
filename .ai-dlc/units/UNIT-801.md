# UNIT-801 — Verify: Boy sheet frame count, size and palette unit tests

## Summary
Unit tests for the boy sheet source

## Description
Test frames count, dimensions and palette use, TDD from R1.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/boySheet.test.ts` · `new: boy sheet source` · new
- **Do:** Import BOY_SHEET_SOURCE and PALETTE. Add tests: frames.length===14; each frame has 48 rows of 32 entries; every index is integer in [0, PALETTE.length); frame 0 differs from frame 2 (idle), frame 4 from frame 6 (walk), frame 10 from frame 12 (interact) via JSON.stringify.
- **Run:** `cd game/frontend && npx vitest run tests/boySheet.test.ts`
- **Expected:** all boy sheet tests pass

## Acceptance criteria
- 14 frames of 32x48
- indices within palette
- poses differ

## Definition of done
- test passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-801.md`

## Links
- Evidence: EVD-163
- Requirement: REQ-399
- Unit (Act): UNIT-798
- Unit (Verify): UNIT-801
- Status: completed
- Change: UPDATE
