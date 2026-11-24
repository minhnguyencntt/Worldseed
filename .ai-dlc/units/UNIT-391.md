# UNIT-391 — Verify: Boy sheets and glow effect assets unit tests

## Summary
Unit test character sheets

## Description
Test sheet widths equal frame math and animations reference valid frames for all spritesheets in the real manifest.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/tests/sg3CharacterSheets.test.ts` · `new: describe('boy spritesheets')` · new
- **Do:** Read the real manifest. For character:boy, character:boy-walk and character:boy-interact assert the file exists, svg width equals frames.frameWidth*frames.frameCount, svg height equals frames.frameHeight, an animation named idle/walk/interact exists respectively, and every frame index is < frameCount. Assert effect:glow exists with a file.
- **Run:** `cd game && npx vitest run tests/sg3CharacterSheets.test.ts`
- **Expected:** All assertions pass

## Acceptance criteria
- Wrong width fails
- Out-of-range frame fails

## Definition of done
- Test passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-391.md`

## Links
- Evidence: EVD-077
- Requirement: REQ-194
- Unit (Act): UNIT-386
- Unit (Verify): UNIT-391
- Status: completed
- Change: UPDATE
