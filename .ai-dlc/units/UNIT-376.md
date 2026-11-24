# UNIT-376 — Verify: SVG assets resolve with manifest dimensions unit tests

## Summary
Unit tests for the nine SVG manifest paths

## Description
Add game/tests/publicAssetSvgs.test.ts. It reads the real manifest.json and the static asset files read-only (no writes, no app, no network) and asserts each SVG path exists with matching dimensions.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/tests/publicAssetSvgs.test.ts` · `new: describe('the-boys-room SVG assets')` · new
- **Do:** Load manifest.json via readFileSync, filter assets whose path ends with .svg and starts with worlds/ (nine entries). Add it('every svg path exists under public/assets') asserting the missing-list equals []; it('svg width and height match manifest dimensions') parsing width="N" height="N" with a regex and comparing to asset.dimensions; it('svg is crispEdges') asserting the content contains '<svg' and 'shape-rendering="crispEdges"'.
- **Run:** `cd game && npx vitest run tests/publicAssetSvgs.test.ts`
- **Expected:** Three tests pass.

## Acceptance criteria
- Missing SVG list is empty
- SVG width/height equal manifest dimensions
- SVG root is svg with crispEdges

## Definition of done
- Test file passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-376.md`

## Links
- Evidence: EVD-074
- Requirement: REQ-187
- Unit (Act): UNIT-374
- Unit (Verify): UNIT-376
- Status: completed
- Change: UPDATE
