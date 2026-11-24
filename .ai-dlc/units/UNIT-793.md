# UNIT-793 — Act: Author wall, wainscot, floor and window grids

## Summary
Create src/art/roomBackground.ts

## Description
Build four ArtSource entries using the draw helpers and ROOM_ART_SIZES.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/art/roomBackground.ts` · `new: wallGrid, wainscotGrid` · new
- **Do:** Import ArtSource from './sources', helpers from './draw', ROOM_ART_SIZES. wallGrid(): createGrid at wall size filled with rampIndex('plum',2); for every x where Math.floor(x/12)%2===0 fillRect a full-height column of rampIndex('plum',3); shade the top 8 rows with indigo step 1 via dither with plum 2; outline nothing. wainscotGrid(): shadeRect full area wood step 3 to 2, fillRect a 3-row top trim at y 0 with brass step 3, a 1-row shadow at y 3 with wood 0, and panel outlines every 60px (outlineRect y 8, h 28, w 52) using wood step 1 plus a wood step 4 highlight row inside the top edge.
- **Expected:** Both functions return grids of 150 and 40 rows by 480 columns

### Step 2 — `game/frontend/src/art/roomBackground.ts` · `new: floorGrid, windowGrid` · after wainscotGrid
- **Do:** floorGrid(): createGrid 480x80 with wood step 3; every 16 rows a fillRect seam row of wood 1; vertical plank joints at x multiples of 48 offset by (row band index*16)%48 using wood 1; dither wood 3/4 on every fourth plank for grain. windowGrid(): createGrid 64x56 with indigo 1 sky, dither indigo 2/indigo 1 in the lower half as stars-free haze, fillRect a 3x3 star cells using moon 5 at (10,8),(40,14),(24,30); draw crescent by filling a 14x14 area at (36,6) with moon 5 then overpainting an offset 12x12 area at (40,4) with indigo 1; frame via outlineRect whole area with brass 1, a second inner outlineRect with brass 4, and a centre cross fillRect of width 2 using brass 3; add curtain strips of plum 3 at x 0-5 and x 58-63 with plum 1 shade columns.
- **Expected:** floorGrid is 80x480 and windowGrid is 56x64 containing moon and brass indices

### Step 3 — `game/frontend/src/art/roomBackground.ts` · `new: BACKGROUND_SOURCES` · after windowGrid
- **Do:** Export BACKGROUND_SOURCES: ArtSource[] with four entries {id:'room/wall',path:'worlds/the-boys-room/room/wall.png',frames:[wallGrid()]} and the same for wainscot, floor, window.
- **Expected:** Array length 4, each frames.length 1

## Acceptance criteria
- BACKGROUND_SOURCES has ids room/wall, room/wainscot, room/floor and room/window
- Each has one frame at its ROOM_ART_SIZES size

## Definition of done
- File compiles
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-793.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-162
- Requirement: REQ-397
- Unit (Act): UNIT-793
- Unit (Verify): UNIT-796
- Status: completed
- Change: UPDATE
