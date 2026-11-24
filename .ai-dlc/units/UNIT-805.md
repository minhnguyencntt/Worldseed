# UNIT-805 — Act: Author the 32x32 boy portrait source

## Summary
Add BOY_PORTRAIT_SOURCE to boy.ts

## Description
Add a pure portrait grid builder and source to boy.ts.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/art/boy.ts` · `new: boyPortraitGrid` · after BOY_SHEET_SOURCE
- **Do:** Add export function boyPortraitGrid(): Grid that creates createGrid(32,32,0), fills a face (parchment 3-4 via shadeRect), hair (wood 1-2) on top rows, eyes (indigo 1) as 2x2 rects, hoodie collar (hoodie 3-2) on bottom 8 rows, and outlineRect around the face with rampIndex('indigo',1).
- **Expected:** Returns 32 rows of 32 columns

### Step 2 — `game/frontend/src/art/boy.ts` · `new: BOY_PORTRAIT_SOURCE, BOY_SOURCES` · after boyPortraitGrid
- **Do:** Export BOY_PORTRAIT_SOURCE: ArtSource with id 'character:boy-portrait', path 'worlds/the-boys-room/characters/boy-portrait.png', frames [boyPortraitGrid()]. Export BOY_SOURCES: ArtSource[] = [BOY_SHEET_SOURCE, BOY_PORTRAIT_SOURCE].
- **Expected:** BOY_SOURCES has two entries

## Acceptance criteria
- BOY_PORTRAIT_SOURCE has one 32x32 frame
- Only palette indices used

## Definition of done
- BOY_PORTRAIT_SOURCE exported
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-805.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-164
- Requirement: REQ-403
- Unit (Act): UNIT-805
- Unit (Verify): UNIT-809
- Status: completed
- Change: NEW
