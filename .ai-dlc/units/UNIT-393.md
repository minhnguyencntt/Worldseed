# UNIT-393 — Verify: Replacement document content unit tests

## Summary
Unit test the document

## Description
Test the doc has sections, the non-production statement and every new manifest id.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/tests/sg3TemporaryAssetsDoc.test.ts` · `new: describe('temporary assets doc')` · new
- **Do:** Read docs/temporary-assets.md and manifest.json. Assert the doc matches /temporary/i and /not production/i, contains headings Backgrounds, Furniture, Objects, Characters, Effects, does not match /production-ready|production quality artwork is included/i, and contains every manifest id that starts with background:, furniture:, character:, effect: or objects/.
- **Run:** `cd game && npx vitest run tests/sg3TemporaryAssetsDoc.test.ts`
- **Expected:** All assertions pass

## Acceptance criteria
- Missing section fails
- Missing id fails

## Definition of done
- Test passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-393.md`

## Links
- Evidence: EVD-077
- Requirement: REQ-196
- Unit (Act): UNIT-388
- Unit (Verify): UNIT-393
- Status: completed
- Change: UPDATE
