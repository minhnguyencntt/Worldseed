# UNIT-794 — Act: Author furniture grids and the ROOM_SOURCES list

## Summary
Create src/art/roomFurniture.ts and src/art/roomSources.ts

## Description
Draw nine furniture pieces with helper outlines (indigo step 0 outline) and ramp shading, then combine with BACKGROUND_SOURCES.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/art/roomFurniture.ts` · `new: deskGrid, computerGrid, lampGrid, plantGrid` · new
- **Do:** Import helpers, ROOM_ART_SIZES, ArtSource. Each function starts from createGrid(w,h,0) at its declared size, with index 0 as the empty background. deskGrid: shadeRect top slab rows 0-5 wood 5 to 4, front body wood 3 to 2, legs fillRect wood 1 at both ends, outlineRect with indigo 0. computerGrid: monitor body parchment 2 with outlineRect indigo 0, screen fillRect moon 3 with a moon 5 highlight row, base brass 1. lampGrid: shade fillRect lamp 4 on top 10 rows with lamp 5 highlight column, stem brass 2, base wood 2, outlined indigo 0. plantGrid: pot wood 3 outlined, leaves fillRect using hoodie-free colours: use moon 2 and moon 3 blocks as foliage with dither between them.
- **Expected:** Four grids returned at 32x80, 34x30, 30x16 and 32x20 (rows x cols)

### Step 2 — `game/frontend/src/art/roomFurniture.ts` · `new: posterGrid, bookshelfGrid` · after plantGrid
- **Do:** posterGrid: parchment 4 paper with outlineRect wood 1, a plum 3 figure block and brass 4 title bar. bookshelfGrid 48x96: shadeRect body wood 3 to 2, outlineRect indigo 0, shelf boards at rows 30, 60 and 90 fillRect wood 5 top highlight and wood 1 underside, books as 3-wide vertical rects alternating plum 3, hoodie 3 and lamp 3 with heights 12-16 on the top two shelves, and a globe on the bottom shelf: 12x12 fillRect moon 3 circle approximated by cutting corners, brass 3 stand.
- **Expected:** posterGrid is 36x28 and bookshelfGrid is 96x48 containing plum, hoodie, lamp, moon and wood indices

### Step 3 — `game/frontend/src/art/roomFurniture.ts` · `new: bedGrid, doorGrid, rugGrid, FURNITURE_SOURCES` · after bookshelfGrid
- **Do:** bedGrid 104x40: wood 3 frame outlined indigo 0, mattress parchment 4, blanket from row 14 with alternating 6px diamond-like blocks of hoodie 3 and hoodie 2 (checker via dither) with lamp 4 trim row, pillow parchment 5. doorGrid 40x80: wood 3 panel shaded, two inset panel outlines wood 1, brass 4 knob 3x3, outline indigo 0, and bottom 2 rows fillRect lamp 5 for light under the door. rugGrid 80x24: plum 3 field, brass 3 border via outlineRect twice, dither plum 4/plum 3 centre. Export FURNITURE_SOURCES with ids room/desk, room/computer, room/lamp, room/plant, room/poster, room/bookshelf, room/bed, room/door, room/rug and paths worlds/the-boys-room/room/<name>.png, one frame each.
- **Expected:** FURNITURE_SOURCES has 9 entries at declared sizes

### Step 4 — `game/frontend/src/art/roomSources.ts` · `new: ROOM_SOURCES` · new
- **Do:** Import BACKGROUND_SOURCES and FURNITURE_SOURCES and export ROOM_SOURCES: ArtSource[] = [...BACKGROUND_SOURCES, ...FURNITURE_SOURCES].
- **Expected:** ROOM_SOURCES has 13 entries

## Acceptance criteria
- FURNITURE_SOURCES has nine entries at declared sizes
- ROOM_SOURCES has 13 entries

## Definition of done
- Files compile
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-794.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-162
- Requirement: REQ-398
- Unit (Act): UNIT-794
- Unit (Verify): UNIT-797
- Status: completed
- Change: UPDATE
