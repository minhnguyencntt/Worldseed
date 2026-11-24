# UNIT-804 — Act: Author the boy sheet frames in boy.ts

## Summary
Create pure frame builders for 14 boy frames

## Description
Create game/frontend/src/art/boy.ts with a pure boyFrame function and BOY_SHEET_SOURCE using draw.ts helpers.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/art/boy.ts` · `new: BOY_W, BOY_H, boyFrame` · new
- **Do:** Create the file. Import createGrid, fillRect, outlineRect, shadeRect, rampIndex and type Grid from './draw', and type ArtSource from './sources'. Export const BOY_W = 32 and BOY_H = 48. Add boyFrame(pose: {legShift: number; armShift: number; bob: number}): Grid that makes createGrid(32,48,0), draws head (parchment 3-4 shade, rows 4+bob..), hoodie body with shadeRect('hoodie',4,2), arms offset by armShift, two legs offset by +/-legShift with indigo 2, then outlineRect around head and body using OUTLINE = rampIndex('indigo',1).

```
const OUTLINE = rampIndex('indigo', 1);
export function boyFrame(p:{legShift:number;armShift:number;bob:number}): Grid { const g = createGrid(BOY_W, BOY_H, 0); /* head, hoodie, arms, legs, outlines */ return g; }
```

- **Expected:** boyFrame returns a 48-row by 32-column grid

### Step 2 — `game/frontend/src/art/boy.ts` · `new: IDLE_POSES, WALK_POSES, INTERACT_POSES` · new
- **Do:** Add three const arrays of pose objects: IDLE_POSES length 4 (bob values 0,1,0,-1 with legShift 0), WALK_POSES length 6 (legShift -3,-2,0,3,2,0 alternating, bob 0,1,0,0,1,0), INTERACT_POSES length 4 (armShift 0,2,4,2 with legShift 0).
- **Expected:** Arrays have lengths 4, 6 and 4

### Step 3 — `game/frontend/src/art/boy.ts` · `new: BOY_SHEET_SOURCE` · new
- **Do:** Export const BOY_SHEET_SOURCE: ArtSource with id 'character:boy-sheet', path 'worlds/the-boys-room/characters/boy-sheet.png', frames [...IDLE_POSES, ...WALK_POSES, ...INTERACT_POSES].map(boyFrame).
- **Expected:** BOY_SHEET_SOURCE.frames.length is 14

## Acceptance criteria
- boy.ts exports BOY_SHEET_SOURCE with 14 frames of 32x48
- All cells are palette indices

## Definition of done
- BOY_SHEET_SOURCE exported and builds without throwing
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-804.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-164
- Requirement: REQ-402
- Unit (Act): UNIT-804
- Unit (Verify): UNIT-808
- Status: completed
- Change: NEW
