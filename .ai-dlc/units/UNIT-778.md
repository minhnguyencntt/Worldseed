# UNIT-778 — Verify: gridToRgba unit tests

## Summary
Unit tests for gridToRgba dimensions, palette-only colours and out-of-range rejection

## Description
Write TDD-style unit tests from REQ-G importing gridToRgba and PALETTE directly; no mocks needed as the function is pure.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/gridToRgba.test.ts` · `new: describe('gridToRgba') dimensions and palette` · new
- **Do:** Add tests importing gridToRgba from '../src/lib/gridToRgba' and PALETTE from '../src/lib/palette'. Test 'returns size': grid [[0,1,2],[3,4,5]] gives width 3, height 2, data.length 24. Test 'palette-only colours': build a Set of '#rrggbb' strings from PALETTE, convert every pixel of a grid using indices 0..47 back to hex and assert membership and alpha 255.

```
expect(img.width).toBe(3); expect(img.height).toBe(2); expect(img.data.length).toBe(24);
```

- **Run:** `cd game/frontend && npx vitest run tests/gridToRgba.test.ts`
- **Expected:** Size and palette-membership tests pass

### Step 2 — `game/frontend/tests/gridToRgba.test.ts` · `new: describe('gridToRgba') errors and determinism` · after previous test
- **Do:** Add tests: expect(() => gridToRgba([[PALETTE.length]])).toThrow(); same for [[-1]] and [[1.5]]; ragged [[0,1],[0]] throws; [] throws; two calls on the same grid give equal arrays via expect(Array.from(a.data)).toEqual(Array.from(b.data)).
- **Run:** `cd game/frontend && npx vitest run tests/gridToRgba.test.ts`
- **Expected:** All throw and determinism tests pass

## Acceptance criteria
- Tests assert width, height and data length
- Tests assert every pixel colour is in the shared palette
- Tests assert out-of-range, negative, non-integer indices and ragged grids throw
- Tests assert identical bytes on repeated calls

## Definition of done
- Test file passes with the command given
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-778.md`

## Links
- Evidence: EVD-158
- Requirement: REQ-388
- Unit (Act): UNIT-776
- Unit (Verify): UNIT-778
- Status: completed
- Change: NEW
