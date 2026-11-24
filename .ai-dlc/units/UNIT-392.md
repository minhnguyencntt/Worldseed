# UNIT-392 — Verify: Spritesheet frame and animation validation unit tests

## Summary
Unit test schema checks

## Description
Test parseManifest on in-memory sheets and on the committed manifest.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/tests/sg3SheetValidation.test.ts` · `new: describe('spritesheet validation')` · new
- **Do:** Import parseManifest from ../src/assets/manifest. Case 1: sheet 64x48 frames 32/48/3 → ok false with an error path 'assets.0.frames.frameCount'. Case 2: sheet 64x48 frames 32/48/2 with animation idle frames [0,5] → error path 'assets.0.animations.idle.frames'. Case 3: frameHeight 60 on height 48 → error path containing 'frameHeight'. Case 4: JSON.parse of public/assets/worlds/the-boys-room/manifest.json → ok true.
- **Run:** `cd game && npx vitest run tests/sg3SheetValidation.test.ts`
- **Expected:** All four cases pass

## Acceptance criteria
- Bad frameCount reported
- Bad animation index reported
- Committed manifest ok

## Definition of done
- Test passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-392.md`

## Links
- Evidence: EVD-077
- Requirement: REQ-195
- Unit (Act): UNIT-387
- Unit (Verify): UNIT-392
- Status: completed
- Change: UPDATE
