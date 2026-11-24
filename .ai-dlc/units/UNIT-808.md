# UNIT-808 — Verify: Boy sheet frame count, size and palette unit tests

## Summary
Unit tests for BOY_SHEET_SOURCE

## Description
Test frame count, per-frame size and palette use from the REQ1 spec.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/boySheet.test.ts` · `new: boy sheet frames` · new
- **Do:** Create tests importing BOY_SHEET_SOURCE and PALETTE. Test 'has 14 frames' expects frames.length 14; test 'each frame is 48 rows by 32 columns' loops frames; test 'uses only palette indices' flattens every grid and asserts Number.isInteger(v) && v>=0 && v<PALETTE.length; test 'idle, walk and interact frames differ' asserts frame 0 != frame 4 != frame 10 via JSON.stringify.
- **Run:** `cd game/frontend && npx vitest run tests/boySheet.test.ts`
- **Expected:** All tests pass

## Acceptance criteria
- 14 frames of 32x48 asserted
- Palette indices asserted

## Definition of done
- Test file passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-808.md`

## Links
- Evidence: EVD-164
- Requirement: REQ-402
- Unit (Act): UNIT-804
- Unit (Verify): UNIT-808
- Status: completed
- Change: NEW
