# UNIT-776 — Act: Create gridToRgba in the frontend lib

## Summary
Add game/frontend/src/lib/gridToRgba.ts with the pure gridToRgba function

## Description
Create the pure function that converts a palette-indexed grid to RGBA using PALETTE from palette.ts, throwing on invalid indices or ragged rows.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/lib/gridToRgba.ts` · `new: RgbaImage` · new
- **Do:** Create the file and export interface RgbaImage with fields width: number, height: number and data: Uint8ClampedArray.

```
import { PALETTE } from './palette';

export interface RgbaImage { width: number; height: number; data: Uint8ClampedArray; }
```

- **Expected:** RgbaImage type is exported from the new file

### Step 2 — `game/frontend/src/lib/gridToRgba.ts` · `new: gridToRgba` · after RgbaImage
- **Do:** Export gridToRgba(grid: readonly (readonly number[])[], palette: readonly string[] = PALETTE): RgbaImage. Throw if grid is empty, if grid[0] is empty or any row length differs from grid[0].length. For each cell throw an Error naming the index when it is not an integer in 0..palette.length-1. Parse the palette hex into r,g,b with parseInt on slices 1-3, 3-5, 5-7 and write r,g,b,255 at offset (y*width+x)*4.

```
export function gridToRgba(grid, palette = PALETTE) {
  const height = grid.length;
  const width = grid[0]?.length ?? 0;
  if (height === 0 || width === 0) throw new Error('grid must not be empty');
  const data = new Uint8ClampedArray(width * height * 4);
  grid.forEach((row, y) => {
    if (row.length !== width) throw new Error(`row ${y} has width ${row.length}, expected ${width}`);
    row.forEach((idx, x) => {
      if (!Number.isInteger(idx) || idx < 0 || idx >= palette.length) throw new Error(`palette index out of range: ${idx} at (${x},${y})`);
      const hex = palette[idx];
      const o = (y * width + x) * 4;
      data[o] = parseInt(hex.slice(1, 3), 16);
      data[o + 1] = parseInt(hex.slice(3, 5), 16);
      data[o + 2] = parseInt(hex.slice(5, 7), 16);
      data[o + 3] = 255;
    });
  });
  return { width, height, data };
}
```

- **Expected:** Valid grids give RGBA data; invalid indices throw

## Acceptance criteria
- gridToRgba(grid) returns width, height and RGBA data of length width*height*4
- An out-of-range or non-integer index throws

## Definition of done
- File exists, exports gridToRgba and RgbaImage, and tsc --noEmit accepts it
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-776.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-158
- Requirement: REQ-388
- Unit (Act): UNIT-776
- Unit (Verify): UNIT-778
- Status: completed
- Change: UPDATE
