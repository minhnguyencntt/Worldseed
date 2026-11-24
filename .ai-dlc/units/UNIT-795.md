# UNIT-795 — Verify: Draw helpers and room size registry unit tests

## Summary
Unit tests for draw.ts and roomSizes.ts

## Description
Write tests from the R1 acceptance criteria with no I/O.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/roomDraw.test.ts` · `new: draw helpers` · new
- **Do:** Create the file. Test rampIndex('wood',2) equals PALETTE.indexOf(PALETTE_RAMPS.wood[2]); rampIndex('indigo',6) throws; createGrid(4,3,7) equals three rows of [7,7,7,7]; fillRect(createGrid(3,3,0),1,1,5,5,9) clips so only cells (1,1),(2,1),(1,2),(2,2) are 9; outlineRect(createGrid(4,4,0),0,0,4,4,5) leaves the 2x2 centre 0; shadeRect over 1x4 with ramp 'wood', 4 and 1 gives indices wood 4,3,2,1 descending; dither(createGrid(2,2,0),0,0,2,2,1,2) gives [[1,2],[2,1]].
- **Run:** `cd game/frontend && npx vitest run tests/roomDraw.test.ts`
- **Expected:** All helper tests pass

### Step 2 — `game/frontend/tests/roomDraw.test.ts` · `describe ROOM_ART_SIZES` · after helper tests
- **Do:** Add a test that Object.keys(ROOM_ART_SIZES) sorted equals the 13 ids, every width and height is a positive integer, and wall.height + wainscot.height + floor.height === 270 with all three widths 480.
- **Run:** `cd game/frontend && npx vitest run tests/roomDraw.test.ts`
- **Expected:** Registry test passes

## Acceptance criteria
- createGrid, fillRect, outlineRect, shadeRect, dither and rampIndex behave as specified
- ROOM_ART_SIZES lists 13 positive integer sizes and the shell heights sum to 270

## Definition of done
- roomDraw tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-795.md`

## Links
- Evidence: EVD-162
- Requirement: REQ-396
- Unit (Act): UNIT-792
- Unit (Verify): UNIT-795
- Status: completed
- Change: UPDATE
