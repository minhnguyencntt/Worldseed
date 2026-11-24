# UNIT-779 — Verify: buildSpriteSheet unit tests

## Summary
Unit tests for buildSpriteSheet width, height, frame count, layout and palette-only colours

## Description
Write TDD-style unit tests from REQ-S importing buildSpriteSheet, gridToRgba and PALETTE; pure functions need no mocks.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/spriteSheet.test.ts` · `new: describe('buildSpriteSheet') size and layout` · new
- **Do:** Import buildSpriteSheet from '../src/lib/spriteSheet' and gridToRgba from '../src/lib/gridToRgba'. Test 'size and count': four frames made by gridToRgba of a 48-row by 32-column grid filled with index i give width 128, height 48, frameWidth 32, frameHeight 48, frameCount 4. Test 'placement': read the pixel at x = i*32+5, y=10 for each i and assert it equals the RGB of PALETTE[i].

```
expect(sheet).toMatchObject({ width: 128, height: 48, frameWidth: 32, frameHeight: 48, frameCount: 4 });
```

- **Run:** `cd game/frontend && npx vitest run tests/spriteSheet.test.ts`
- **Expected:** Size and placement tests pass

### Step 2 — `game/frontend/tests/spriteSheet.test.ts` · `new: describe('buildSpriteSheet') palette, errors, determinism` · after previous test
- **Do:** Add tests: every pixel of the 4-frame sheet has RGB in the set of PALETTE colours; buildSpriteSheet([]) throws; frames of 2x2 and 3x2 throw; two calls give equal Array.from(data); the input frame data arrays are unchanged after the call.
- **Run:** `cd game/frontend && npx vitest run tests/spriteSheet.test.ts`
- **Expected:** Palette, error, determinism and non-mutation tests pass

## Acceptance criteria
- Tests assert 4 frames of 32x48 give 128x48, frameCount 4
- Tests assert frame placement and unchanged pixels
- Tests assert empty and mismatched input throw
- Tests assert every sheet pixel colour is in the palette and bytes repeat identically

## Definition of done
- Test file passes with the command given
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-779.md`

## Links
- Evidence: EVD-158
- Requirement: REQ-389
- Unit (Act): UNIT-777
- Unit (Verify): UNIT-779
- Status: completed
- Change: NEW
