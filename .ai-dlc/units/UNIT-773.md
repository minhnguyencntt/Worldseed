# UNIT-773 — Act: Add buildSpriteSheet to the art module

## Summary
Create game/frontend/src/art/spriteSheet.ts that lays frames out horizontally using gridToRgba.

## Description
Create the pure module that validates frames, converts each with gridToRgba and copies rows into one sheet buffer, returning sheet metadata.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/art/spriteSheet.ts` · `new: SpriteSheet` · new
- **Do:** Create the file importing gridToRgba and PixelGrid from './pixelGrid'. Export interface SpriteSheet { width: number; height: number; frameWidth: number; frameHeight: number; frameCount: number; data: Uint8ClampedArray }.
- **Expected:** Interface compiles.

### Step 2 — `game/frontend/src/art/spriteSheet.ts` · `new: buildSpriteSheet` · after SpriteSheet
- **Do:** Export buildSpriteSheet(frames: readonly PixelGrid[]): SpriteSheet. Throw Error('no frames') when frames.length is 0. Convert every frame with gridToRgba; throw Error if any width/height differs from the first frame's. Set sheetWidth = frameWidth*frames.length. Allocate Uint8ClampedArray(sheetWidth*frameHeight*4). For frame k and row y, data.set(frameData.subarray(y*frameWidth*4,(y+1)*frameWidth*4), (y*sheetWidth + k*frameWidth)*4). Return the metadata and data.

```
export function buildSpriteSheet(frames: readonly PixelGrid[]): SpriteSheet { /* as described */ }
```

- **Expected:** 4 frames of 32x48 give width 128, height 48, frameCount 4.

## Acceptance criteria
- buildSpriteSheet returns width, height, frameWidth, frameHeight, frameCount and data.
- Empty or mismatched frames throw.

## Definition of done
- Module compiles and exports SpriteSheet and buildSpriteSheet.
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-773.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-157
- Requirement: REQ-387
- Unit (Act): UNIT-773
- Unit (Verify): UNIT-775
- Status: completed
- Change: UPDATE
