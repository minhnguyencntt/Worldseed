# UNIT-775 — Verify: buildSpriteSheet unit tests

## Summary
Unit tests for sheet size, frame count, frame placement, palette-only colours and errors.

## Description
Write tests from REQ2 acceptance criteria using small synthetic grids.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/spriteSheet.test.ts` · `new: describe('buildSpriteSheet') › metadata and placement` · new
- **Do:** Create the test file. Build 4 frames of 32x48 filled with indices 0..3 via Array.from. Assert width 128, height 48, frameWidth 32, frameHeight 48, frameCount 4, data.length 128*48*4. Assert the pixel at (k*32, 0) equals gridToRgba(frame k).data first 4 bytes for k 0..3.
- **Run:** `cd game/frontend && npx vitest run tests/spriteSheet.test.ts`
- **Expected:** Tests pass.

### Step 2 — `game/frontend/tests/spriteSheet.test.ts` · `describe('buildSpriteSheet') › palette, errors, determinism` · after metadata tests
- **Do:** Add tests: every opaque pixel's colour is in PALETTE; [] throws; frames of 2x2 and 3x2 throw; a frame with index 99 throws; two builds of the same frames give toEqual data (identical bytes).
- **Run:** `cd game/frontend && npx vitest run tests/spriteSheet.test.ts`
- **Expected:** All tests pass.

## Acceptance criteria
- Metadata, frame placement and palette-only colours are asserted.
- Throws on bad input and identical bytes on repeat runs are asserted.

## Definition of done
- All tests in spriteSheet.test.ts pass.
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-775.md`

## Links
- Evidence: EVD-157
- Requirement: REQ-387
- Unit (Act): UNIT-773
- Unit (Verify): UNIT-775
- Status: completed
- Change: UPDATE
