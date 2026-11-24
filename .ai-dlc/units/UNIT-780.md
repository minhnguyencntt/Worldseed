# UNIT-780 — Act: Create encodePng and readPngSize in the frontend lib

## Summary
Add pngEncode.ts with deterministic PNG encoding

## Description
Create game/frontend/src/lib/pngEncode.ts exporting encodePng and readPngSize using node:zlib deflateSync at fixed level 9.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/lib/pngEncode.ts` · `new: crc32 and chunk` · new
- **Do:** Add a module-level 256-entry CRC table, crc32(bytes) and chunk(type, data) returning length(4 BE)+type+data+crc over type+data.

```
const T=new Uint32Array(256).map((_,n)=>{let c=n;for(let k=0;k<8;k++)c=c&1?0xedb88320^(c>>>1):c>>>1;return c>>>0});
```

- **Expected:** chunk('IEND', empty) yields 12 bytes

### Step 2 — `game/frontend/src/lib/pngEncode.ts` · `new: encodePng` · new
- **Do:** Export encodePng(img: RgbaImage): Uint8Array that writes the 8-byte signature, IHDR (width, height, bit depth 8, colour type 6, 0,0,0), one IDAT of deflateSync of rows each prefixed by filter byte 0 with level 9, then IEND; no other chunks.
- **Expected:** Returns bytes starting 137 80 78 71 13 10 26 10

### Step 3 — `game/frontend/src/lib/pngEncode.ts` · `new: readPngSize` · new
- **Do:** Export readPngSize(bytes) returning {width,height} read big-endian from offsets 16 and 20; throw Error('not a png') when the signature differs.
- **Expected:** Returns the encoded dimensions

## Acceptance criteria
- encodePng returns equal bytes on repeated calls
- readPngSize returns the encoded width and height

## Definition of done
- Functions exported and typecheck passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-780.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-159
- Requirement: REQ-390
- Unit (Act): UNIT-780
- Unit (Verify): UNIT-783
- Status: completed
- Change: UPDATE
