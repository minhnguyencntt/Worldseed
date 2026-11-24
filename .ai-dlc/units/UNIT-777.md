# UNIT-777 — Act: Create buildSpriteSheet in the frontend lib

## Summary
Add game/frontend/src/lib/spriteSheet.ts with the pure buildSpriteSheet function

## Description
Create the pure function that lays equal-size RGBA frames side by side into one sheet and returns size and frame metadata.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/lib/spriteSheet.ts` · `new: SpriteFrame, SpriteSheet` · new
- **Do:** Create the file exporting interface SpriteFrame {width:number;height:number;data:Uint8ClampedArray} and interface SpriteSheet extends SpriteFrame with frameWidth, frameHeight and frameCount numbers.

```
export interface SpriteFrame { width: number; height: number; data: Uint8ClampedArray; }
export interface SpriteSheet extends SpriteFrame { frameWidth: number; frameHeight: number; frameCount: number; }
```

- **Expected:** Both types are exported

### Step 2 — `game/frontend/src/lib/spriteSheet.ts` · `new: buildSpriteSheet` · after SpriteSheet
- **Do:** Export buildSpriteSheet(frames: readonly SpriteFrame[]): SpriteSheet. Throw when frames is empty or any frame width/height differs from frames[0]. Allocate data of size frameWidth*frameCount*frameHeight*4 and, for each frame i and row y, copy frame.data.subarray(y*fw*4,(y+1)*fw*4) to offset (y*sheetWidth + i*fw)*4 using data.set.

```
export function buildSpriteSheet(frames) {
  if (frames.length === 0) throw new Error('frames must not be empty');
  const { width: fw, height: fh } = frames[0];
  const n = frames.length;
  const width = fw * n;
  const data = new Uint8ClampedArray(width * fh * 4);
  frames.forEach((f, i) => {
    if (f.width !== fw || f.height !== fh) throw new Error(`frame ${i} is ${f.width}x${f.height}, expected ${fw}x${fh}`);
    for (let y = 0; y < fh; y++) data.set(f.data.subarray(y * fw * 4, (y + 1) * fw * 4), (y * width + i * fw) * 4);
  });
  return { width, height: fh, frameWidth: fw, frameHeight: fh, frameCount: n, data };
}
```

- **Expected:** Frames are laid out left to right with metadata

## Acceptance criteria
- buildSpriteSheet(frames) returns width = frameWidth*frameCount and height = frameHeight
- Empty input or mismatched frame sizes throw

## Definition of done
- File exists, exports buildSpriteSheet and SpriteSheet, and tsc --noEmit accepts it
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-777.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-158
- Requirement: REQ-389
- Unit (Act): UNIT-777
- Unit (Verify): UNIT-779
- Status: completed
- Change: UPDATE
