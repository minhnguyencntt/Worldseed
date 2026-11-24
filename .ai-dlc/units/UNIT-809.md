# UNIT-809 — Verify: Boy portrait size and palette unit tests

## Summary
Unit tests for BOY_PORTRAIT_SOURCE

## Description
Test portrait size and palette from the REQ2 spec.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/boyPortrait.test.ts` · `new: boy portrait` · new
- **Do:** Create tests importing BOY_PORTRAIT_SOURCE and PALETTE: 'has one frame' expects frames.length 1; 'is 32x32' expects 32 rows each of length 32; 'uses only palette indices' asserts every cell is an integer in 0..PALETTE.length-1.
- **Run:** `cd game/frontend && npx vitest run tests/boyPortrait.test.ts`
- **Expected:** All tests pass

## Acceptance criteria
- 32x32 asserted
- Palette indices asserted

## Definition of done
- Test file passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-809.md`

## Links
- Evidence: EVD-164
- Requirement: REQ-403
- Unit (Act): UNIT-805
- Unit (Verify): UNIT-809
- Status: completed
- Change: NEW
