# UNIT-783 — Verify: encodePng determinism and readPngSize unit tests

## Summary
Unit tests for the PNG encoder

## Description
Tests for encodePng and readPngSize written from REQ-1.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/pngEncode.test.ts` · `new: encodePng is deterministic` · new
- **Do:** Build a 4x3 RgbaImage with gridToRgba of indices 0..11; call encodePng twice and assert Buffer.from(a).equals(Buffer.from(b)).
- **Run:** `cd game/frontend && npx vitest run tests/pngEncode.test.ts`
- **Expected:** Test passes

### Step 2 — `game/frontend/tests/pngEncode.test.ts` · `new: readPngSize reads IHDR` · new
- **Do:** Assert readPngSize(encodePng(img)) equals {width:4,height:3} and that readPngSize(new Uint8Array(30)) throws 'not a png'.
- **Run:** `cd game/frontend && npx vitest run tests/pngEncode.test.ts`
- **Expected:** Test passes

### Step 3 — `game/frontend/tests/pngEncode.test.ts` · `new: only IHDR IDAT IEND chunks` · new
- **Do:** Walk chunks from byte 8 reading length and 4-char type; assert types equal ['IHDR','IDAT','IEND'].
- **Run:** `cd game/frontend && npx vitest run tests/pngEncode.test.ts`
- **Expected:** Test passes

## Acceptance criteria
- Two encodes are equal
- Header size matches
- Only IHDR, IDAT, IEND chunks exist

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-783.md`

## Links
- Evidence: EVD-159
- Requirement: REQ-390
- Unit (Act): UNIT-780
- Unit (Verify): UNIT-783
- Status: completed
- Change: UPDATE
