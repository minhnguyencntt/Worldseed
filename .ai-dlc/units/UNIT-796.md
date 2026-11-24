# UNIT-796 — Verify: Background grid size and palette unit tests

## Summary
Tests for wall, wainscot, floor and window grids

## Description
Write tests from the R2 criteria.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/roomBackground.test.ts` · `new: sizes` · new
- **Do:** Create the file. For each source in BACKGROUND_SOURCES, strip the 'room/' prefix to get the id, read ROOM_ART_SIZES[id], and assert frames.length is 1, grid.length equals height and every row length equals width.
- **Run:** `cd game/frontend && npx vitest run tests/roomBackground.test.ts`
- **Expected:** Size test passes for the 4 ids

### Step 2 — `game/frontend/tests/roomBackground.test.ts` · `new: palette use` · after sizes
- **Do:** For each source call gridToRgba(frames[0], PALETTE); build the set of 'r,g,b' from data and assert each equals a PALETTE hex converted to rgb and the distinct index count is at least 3. Also assert the wall grid contains both rampIndex('plum',2) and rampIndex('plum',3), the wainscot contains a wood-ramp index, and the window contains rampIndex('moon',5) and a brass-ramp index.
- **Run:** `cd game/frontend && npx vitest run tests/roomBackground.test.ts`
- **Expected:** Palette tests pass

## Acceptance criteria
- Each background grid has its declared size
- Each renders with gridToRgba using only palette colours

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-796.md`

## Links
- Evidence: EVD-162
- Requirement: REQ-397
- Unit (Act): UNIT-793
- Unit (Verify): UNIT-796
- Status: completed
- Change: UPDATE
