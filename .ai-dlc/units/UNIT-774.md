# UNIT-774 — Verify: gridToRgba unit tests

## Summary
Unit tests for gridToRgba covering size, palette-only colours, transparency and out-of-range throw.

## Description
Write tests from REQ1 acceptance criteria. No I/O or mocks needed beyond the pure function.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/pixelGrid.test.ts` · `new: describe('gridToRgba') › sizes and palette-only colours` · new
- **Do:** Create the test file. Test 'reports width, height and data length': grid [[0,1,2],[3,4,5]] gives width 3, height 2, data.length 24. Test 'uses only palette colours': convert a grid containing indices 0, 7, 47; for each pixel build '#'+hex of rgb and assert PALETTE.includes it and alpha is 255.
- **Run:** `cd game/frontend && npx vitest run tests/pixelGrid.test.ts`
- **Expected:** Both tests pass.

### Step 2 — `game/frontend/tests/pixelGrid.test.ts` · `describe('gridToRgba') › transparency, errors, determinism` · after first describe tests
- **Do:** Add tests: index -1 yields alpha 0; indices 48, -2 and 1.5 each make expect(() => gridToRgba([[v]])).toThrow(RangeError); ragged rows [[0,1],[0]] throw; converting the same grid twice gives equal arrays (toEqual).
- **Run:** `cd game/frontend && npx vitest run tests/pixelGrid.test.ts`
- **Expected:** All tests pass.

## Acceptance criteria
- Size, palette-only and throw behaviours are asserted.
- Determinism is asserted.

## Definition of done
- All tests in pixelGrid.test.ts pass.
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-774.md`

## Links
- Evidence: EVD-157
- Requirement: REQ-386
- Unit (Act): UNIT-772
- Unit (Verify): UNIT-774
- Status: completed
- Change: UPDATE
