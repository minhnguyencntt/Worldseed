# UNIT-797 — Verify: Furniture and full room source size and palette unit tests

## Summary
Tests for all room sources

## Description
Write tests from the R3 criteria and the intent criteria across ROOM_SOURCES.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/roomSources.test.ts` · `new: coverage and sizes` · new
- **Do:** Create the file. Assert ROOM_SOURCES ids are unique and sorted names after stripping 'room/' equal Object.keys(ROOM_ART_SIZES) sorted. For each source assert frames.length 1, grid height and every row width equal ROOM_ART_SIZES[name].
- **Run:** `cd game/frontend && npx vitest run tests/roomSources.test.ts`
- **Expected:** Coverage and size tests pass for 13 ids

### Step 2 — `game/frontend/tests/roomSources.test.ts` · `new: palette use` · after sizes
- **Do:** For each source, collect the Set of indices; assert it has at least 3 members, every index is an integer in [0, PALETTE.length), and gridToRgba(frames[0], PALETTE) does not throw. Assert the bookshelf set includes rampIndex('plum',3), rampIndex('hoodie',3), rampIndex('lamp',3) and rampIndex('moon',3), the bed includes rampIndex('hoodie',3) and rampIndex('hoodie',2), and the door bottom row equals rampIndex('lamp',5) throughout.
- **Run:** `cd game/frontend && npx vitest run tests/roomSources.test.ts`
- **Expected:** Palette tests pass

## Acceptance criteria
- Every ROOM_SOURCES grid has its declared size
- Every grid renders with only palette colours and at least 3 distinct indices
- Registry covers all 13 declared ids

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-797.md`

## Links
- Evidence: EVD-162
- Requirement: REQ-398
- Unit (Act): UNIT-794
- Unit (Verify): UNIT-797
- Status: completed
- Change: UPDATE
