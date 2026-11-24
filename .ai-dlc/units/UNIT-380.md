# UNIT-380 — Verify: ui folders each hold a real crisp SVG unit tests

## Summary
Unit tests read the three ui folders and assert real, non-empty, crisp SVGs.

## Description
Read-only unit tests over the on-disk tree under game/public/assets/ui; no app is started.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/tests/publicAssetUi.test.ts` · `new: describe('ui asset folders')` · new
- **Do:** Create a test with it.each(['icons','frames','cursors']) that lists ../public/assets/ui/<dir> via readdirSync, filters .svg, asserts length >= 1 and statSync size > 0 for each. Add a second it.each that reads each SVG and asserts it contains '<svg', a width="N" attribute, a height="N" attribute and shape-rendering="crispEdges".
- **Run:** `cd game && npx vitest run tests/publicAssetUi.test.ts`
- **Expected:** All tests in publicAssetUi.test.ts pass (six cases)

## Acceptance criteria
- Given each of icons, frames and cursors, When listed, Then at least one .svg exists and is non-empty
- Given each SVG, When read, Then it has width, height and crispEdges

## Definition of done
- Test file passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-380.md`

## Links
- Evidence: EVD-075
- Requirement: REQ-189
- Unit (Act): UNIT-378
- Unit (Verify): UNIT-380
- Status: completed
- Change: UPDATE
