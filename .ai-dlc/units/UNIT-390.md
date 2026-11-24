# UNIT-390 — Verify: Books and secret door state assets unit tests

## Summary
Unit test object assets

## Description
Test the three object assets resolve, match dimensions and the door states differ.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/tests/sg3ObjectAssets.test.ts` · `new: describe('books and secret door states')` · new
- **Do:** Read the real manifest and SVGs as in publicAssetSvgs.test.ts. Assert ids objects/books, objects/secret-door-closed, objects/secret-door-open exist, files exist, svg width/height match dimensions, the two door entries have equal dimensions, and the two door files' contents are not equal.
- **Run:** `cd game && npx vitest run tests/sg3ObjectAssets.test.ts`
- **Expected:** All assertions pass

## Acceptance criteria
- Missing file fails
- Identical door content fails

## Definition of done
- Test passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-390.md`

## Links
- Evidence: EVD-077
- Requirement: REQ-193
- Unit (Act): UNIT-385
- Unit (Verify): UNIT-390
- Status: completed
- Change: UPDATE
