# UNIT-772 — Act: Add gridToRgba to the art module

## Summary
Create game/frontend/src/art/pixelGrid.ts with gridToRgba.

## Description
Create the pure module converting a palette-indexed grid into RGBA bytes using PALETTE from src/lib/palette.ts.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/art/pixelGrid.ts` · `new: PixelGrid, TRANSPARENT, hexToRgb` · new
- **Do:** Create the file importing PALETTE from '../lib/palette'. Export type PixelGrid = readonly (readonly number[])[], export const TRANSPARENT = -1, and a local hexToRgb(hex) returning [r,g,b] parsed from the 6 hex digits after '#'.

```
import { PALETTE } from '../lib/palette';
export type PixelGrid = readonly (readonly number[])[];
export const TRANSPARENT = -1;
function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
```

- **Expected:** File compiles with the three declarations.

### Step 2 — `game/frontend/src/art/pixelGrid.ts` · `new: gridToRgba` · after hexToRgb
- **Do:** Export gridToRgba(grid: PixelGrid): { width: number; height: number; data: Uint8ClampedArray }. height = grid.length, width = grid[0]?.length ?? 0. Throw Error if any row length differs from width. Allocate Uint8ClampedArray(width*height*4). For each cell: if value === TRANSPARENT leave zeros; else if !Number.isInteger(value) or value<0 or value>=PALETTE.length throw RangeError with the value, x and y; else write hexToRgb(PALETTE[value]) and alpha 255 at offset (y*width+x)*4.

```
export function gridToRgba(grid: PixelGrid) { /* as described */ }
```

- **Expected:** gridToRgba([[0,1],[2,-1]]) returns width 2, height 2, 16 bytes with the last pixel alpha 0.

## Acceptance criteria
- gridToRgba returns width, height and RGBA data for valid grids.
- Out-of-range or non-integer indices throw RangeError.

## Definition of done
- Module compiles under tsc --noEmit and exports PixelGrid, TRANSPARENT and gridToRgba.
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-772.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-157
- Requirement: REQ-386
- Unit (Act): UNIT-772
- Unit (Verify): UNIT-774
- Status: completed
- Change: UPDATE
