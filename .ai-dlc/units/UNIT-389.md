# UNIT-389 — Verify: Background layer and chair/wardrobe assets resolve with matching dimensions unit tests

## Summary
Unit test new layer assets

## Description
Add a test reading the real manifest and SVG files for the six new ids, checking existence, dimensions and colour variety.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/tests/sg3BackgroundFurniture.test.ts` · `new: describe('background layers and furniture')` · new
- **Do:** Model on game/tests/publicAssetSvgs.test.ts: read manifest.json via fileURLToPath(new URL('../public/assets', import.meta.url)). For ids background:wall, background:floor, background:window-view, background:lighting, furniture:chair, furniture:wardrobe assert the entry exists, the file exists, svg width/height regex equals manifest dimensions, and the file contains at least two distinct fill="#..." values.
- **Run:** `cd game && npx vitest run tests/sg3BackgroundFurniture.test.ts`
- **Expected:** All assertions pass

## Acceptance criteria
- Missing ids fail the test
- Size mismatch fails the test

## Definition of done
- Test passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-389.md`

## Links
- Evidence: EVD-077
- Requirement: REQ-192
- Unit (Act): UNIT-384
- Unit (Verify): UNIT-389
- Status: completed
- Change: UPDATE
