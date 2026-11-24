# UNIT-798 — Act: Author the boy sheet frames in boy.ts

## Summary
Draw 14 boy frames at 32x48

## Description
Create src/art/boy.ts with pure functions drawing the boy per pose using draw.ts, and export the sheet ArtSource.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/art/boy.ts` · `new: boyFrame` · new
- **Do:** Add boyFrame(pose: 'idle'|'walk'|'interact', step: number): Grid using createGrid(32,48,0), shadeRect for hoodie (ramp 'hoodie'), head and legs, outlineRect with rampIndex('indigo',0); vary arm and leg offsets by step; interact raises one arm.

```
export function boyFrame(pose: 'idle'|'walk'|'interact', step: number): Grid { const g = createGrid(32,48,0); /* body per pose */ return g; }
```

- **Expected:** boyFrame returns a 48x32 grid for every pose and step

### Step 2 — `game/frontend/src/art/boy.ts` · `new: BOY_SHEET_SOURCE` · new
- **Do:** Export BOY_SHEET_SOURCE: ArtSource with id 'character:boy-art', path 'worlds/the-boys-room/characters/boy.png', frames = 4 idle (steps 0-3), 6 walk (0-5), 4 interact (0-3) in that order.

```
export const BOY_SHEET_SOURCE: ArtSource = { id:'character:boy-art', path:'worlds/the-boys-room/characters/boy.png', frames:[...] };
```

- **Expected:** frames.length is 14

## Acceptance criteria
- boy sheet source has 14 frames of 32x48
- frames use indices within the palette

## Definition of done
- BOY_SHEET_SOURCE exported with 14 frames
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-798.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-163
- Requirement: REQ-399
- Unit (Act): UNIT-798
- Unit (Verify): UNIT-801
- Status: completed
- Change: UPDATE
