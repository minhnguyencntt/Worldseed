# UNIT-822 — Verify: Item icon grids are 16x16, outlined, shaded and palette-only

## Summary
Unit tests for itemIcons sources

## Description
Write game/frontend/tests/itemIcons.test.ts, modelled on tests/roomSources.test.ts, proving ids, sizes, outline, shading and ART_SOURCES wiring from the requirement.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/itemIcons.test.ts` · `new: describe('item icon sources')` · new
- **Do:** Import ITEM_SOURCES from ../src/art/itemIcons, ART_SOURCES from ../src/art/sources, rampIndex from ../src/art/draw, gridToRgba from ../src/lib/gridToRgba and PALETTE from ../src/lib/palette. Add it('has six unique item/ ids') expecting ids toEqual the six names old-key, note, book, coin, flashlight, photo prefixed item/ and Set size 6.
- **Run:** `cd game/frontend && npx vitest run tests/itemIcons.test.ts -t 'unique'`
- **Expected:** The unique-ids test passes.

### Step 2 — `game/frontend/tests/itemIcons.test.ts` · `it.each(ITEM_SOURCES) size, outline and shading` · new
- **Do:** For each source assert frames.length is 1, the grid has 16 rows each of length 16, the flattened set contains rampIndex('indigo', 0), and the set has at least 3 distinct values including 0 or two non-outline indices. Also assert gridToRgba(frame, PALETTE) does not throw.
- **Run:** `cd game/frontend && npx vitest run tests/itemIcons.test.ts`
- **Expected:** All per-icon tests pass.

### Step 3 — `game/frontend/tests/itemIcons.test.ts` · `it('is included in ART_SOURCES')` · new
- **Do:** Assert every ITEM_SOURCES id appears in ART_SOURCES.map(s => s.id).
- **Run:** `cd game/frontend && npx vitest run tests/itemIcons.test.ts -t 'ART_SOURCES'`
- **Expected:** The wiring test passes.

## Acceptance criteria
- Test asserts six unique item/ ids.
- Test asserts each frame is 16x16 with the outline index and at least two other non-zero indices.
- Test asserts gridToRgba succeeds for every item frame and ART_SOURCES includes them.

## Definition of done
- itemIcons.test.ts passes.
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-822.md`

## Links
- Evidence: EVD-166
- Requirement: REQ-410
- Unit (Act): UNIT-820
- Unit (Verify): UNIT-822
- Status: completed
- Change: UPDATE
