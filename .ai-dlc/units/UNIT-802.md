# UNIT-802 — Verify: Boy portrait size and palette unit tests

## Summary
Unit tests for the portrait source

## Description
Test portrait dimensions and palette from R2.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/boyPortrait.test.ts` · `new: boy portrait source` · new
- **Do:** Import BOY_PORTRAIT_SOURCE and PALETTE. Assert frames.length===1, 32 rows each 32 wide, all indices in [0,PALETTE.length), and some index !== 0.
- **Run:** `cd game/frontend && npx vitest run tests/boyPortrait.test.ts`
- **Expected:** portrait tests pass

## Acceptance criteria
- 32x32 single frame
- valid indices, non-empty

## Definition of done
- test passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-802.md`

## Links
- Evidence: EVD-163
- Requirement: REQ-400
- Unit (Act): UNIT-799
- Unit (Verify): UNIT-802
- Status: completed
- Change: UPDATE
