# UNIT-769 — Verify: Palette module unit tests

## Summary
Unit tests for palette size, format, uniqueness and ramps

## Description
Write TDD-style tests for the palette module from the requirement.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/palette.test.ts` · `new: palette module` · new
- **Do:** Create the file importing PALETTE, PALETTE_RAMPS, WARM_RAMPS, COOL_RAMPS from '../src/lib/palette'. Add test 'has at most 48 unique hex colours' asserting PALETTE.length <= 48, new Set(PALETTE).size === PALETTE.length, and every entry matches /^#[0-9a-f]{6}$/.
- **Run:** `cd game/frontend && npx vitest run tests/palette.test.ts`
- **Expected:** Test passes.

### Step 2 — `game/frontend/tests/palette.test.ts` · `warm and cool ramps` · after first test
- **Do:** Add test 'names warm and cool ramps' asserting every name in WARM_RAMPS and COOL_RAMPS is a key of PALETTE_RAMPS, the two lists share no name, and together they cover Object.keys(PALETTE_RAMPS).
- **Run:** `cd game/frontend && npx vitest run tests/palette.test.ts`
- **Expected:** Both tests pass.

## Acceptance criteria
- Tests assert at most 48 unique lowercase hex colours.
- Tests assert warm and cool ramp names exist and do not overlap.

## Definition of done
- palette tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-769.md`

## Links
- Evidence: EVD-156
- Requirement: REQ-383
- Unit (Act): UNIT-766
- Unit (Verify): UNIT-769
- Status: completed
- Change: UPDATE
