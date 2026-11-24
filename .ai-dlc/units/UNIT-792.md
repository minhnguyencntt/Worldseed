# UNIT-792 — Act: Add draw helpers and the ROOM_ART_SIZES registry

## Summary
Create src/art/draw.ts and src/art/roomSizes.ts

## Description
Add pure helpers over number[][] grids that index PALETTE, plus the registry of declared sizes: wall 480x150, wainscot 480x40, floor 480x80, window 64x56, desk 80x32, computer 30x34, lamp 16x30, plant 20x32, poster 28x36, bookshelf 48x96, bed 104x40, door 40x80, rug 80x24. The first three together fill 480x270.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/art/draw.ts` · `new: rampIndex` · new
- **Do:** Create the file. Import PALETTE_RAMPS from '../lib/palette'. Export rampIndex(ramp: keyof typeof PALETTE_RAMPS, step: number): number returning Object.keys(PALETTE_RAMPS).indexOf(ramp) * 6 + step, and throw an Error when step is not an integer 0-5.

```
export function rampIndex(ramp: keyof typeof PALETTE_RAMPS, step: number): number { if (!Number.isInteger(step) || step < 0 || step > 5) throw new Error(`bad ramp step ${step}`); return Object.keys(PALETTE_RAMPS).indexOf(ramp) * 6 + step; }
```

- **Expected:** rampIndex('indigo',0) is 0 and rampIndex('lamp',5) is 47

### Step 2 — `game/frontend/src/art/draw.ts` · `new: createGrid, fillRect, outlineRect` · after rampIndex
- **Do:** Export Grid = number[][]. createGrid(w,h,idx) returns Array.from({length:h},()=>Array(w).fill(idx)). fillRect(g,x,y,w,h,idx) sets cells inside the grid bounds, clipping outside ones. outlineRect(g,x,y,w,h,idx) sets only the 1px border of that rectangle via fillRect calls.
- **Expected:** createGrid(4,3,1) has 3 rows of 4 ones; fillRect clips without throwing

### Step 3 — `game/frontend/src/art/draw.ts` · `new: shadeRect, dither` · after outlineRect
- **Do:** shadeRect(g,x,y,w,h,ramp,lightStep,darkStep) fills row bands from rampIndex(ramp,lightStep) at the top to rampIndex(ramp,darkStep) at the bottom, one band per row, choosing step by Math.round of linear interpolation. dither(g,x,y,w,h,a,b) fills cells with a when (cx+cy)%2===0 else b.
- **Expected:** shadeRect on a 1x4 area with steps 4 to 1 yields indices descending in ramp order; dither alternates a and b

### Step 4 — `game/frontend/src/art/roomSizes.ts` · `new: ROOM_ART_SIZES` · new
- **Do:** Export ROOM_ART_SIZES: Record<string,{width:number;height:number}> with keys wall, wainscot, floor, window, desk, computer, lamp, plant, poster, bookshelf, bed, door, rug and the sizes stated in the description, as const-style literal values.

```
export const ROOM_ART_SIZES = { wall:{width:480,height:150}, wainscot:{width:480,height:40}, floor:{width:480,height:80}, window:{width:64,height:56}, desk:{width:80,height:32}, computer:{width:30,height:34}, lamp:{width:16,height:30}, plant:{width:20,height:32}, poster:{width:28,height:36}, bookshelf:{width:48,height:96}, bed:{width:104,height:40}, door:{width:40,height:80}, rug:{width:80,height:24} } as const;
```

- **Expected:** Registry has 13 keys; wall, wainscot and floor heights sum to 270

## Acceptance criteria
- draw.ts exports createGrid, fillRect, outlineRect, shadeRect, dither and rampIndex
- roomSizes.ts exports ROOM_ART_SIZES with the 13 declared sizes

## Definition of done
- Both files compile under tsc --noEmit
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-792.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-162
- Requirement: REQ-396
- Unit (Act): UNIT-792
- Unit (Verify): UNIT-795
- Status: completed
- Change: UPDATE
