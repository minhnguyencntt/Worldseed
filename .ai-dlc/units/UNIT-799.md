# UNIT-799 — Act: Author the 32x32 boy portrait source

## Summary
Draw portrait grid and export source

## Description
Add portraitGrid and BOY_PORTRAIT_SOURCE to boy.ts plus BOY_SOURCES list.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/art/boy.ts` · `new: portraitGrid` · after boyFrame
- **Do:** Add portraitGrid(): Grid using createGrid(32,32,0), shadeRect face (ramp 'parchment'), hair (ramp 'wood'), hoodie shoulders (ramp 'hoodie'), outlineRect with rampIndex('indigo',0).

```
export function portraitGrid(): Grid { const g = createGrid(32,32,0); return g; }
```

- **Expected:** 32x32 grid

### Step 2 — `game/frontend/src/art/boy.ts` · `new: BOY_PORTRAIT_SOURCE, BOY_SOURCES` · end of file
- **Do:** Export BOY_PORTRAIT_SOURCE {id:'character:boy-portrait', path:'worlds/the-boys-room/characters/boy-portrait.png', frames:[portraitGrid()]} and BOY_SOURCES=[BOY_SHEET_SOURCE, BOY_PORTRAIT_SOURCE].
- **Expected:** BOY_SOURCES has 2 entries

## Acceptance criteria
- one 32x32 frame
- palette indices only

## Definition of done
- BOY_SOURCES exported
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-799.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-163
- Requirement: REQ-400
- Unit (Act): UNIT-799
- Unit (Verify): UNIT-802
- Status: completed
- Change: UPDATE
