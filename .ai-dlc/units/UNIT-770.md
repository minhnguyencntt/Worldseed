# UNIT-770 — Verify: Palette Tailwind colour export unit tests

## Summary
Unit tests for paletteTailwindColors and tailwind.config pal

## Description
Test the Tailwind export against the palette.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/paletteTailwind.test.ts` · `new: paletteTailwindColors` · new
- **Do:** Create the file importing PALETTE and paletteTailwindColors from '../src/lib/palette'. Add test 'flattens to every palette colour once' asserting Object.values(paletteTailwindColors).flatMap(Object.values) sorted equals [...PALETTE] sorted.
- **Run:** `cd game/frontend && npx vitest run tests/paletteTailwind.test.ts`
- **Expected:** Test passes.

### Step 2 — `game/frontend/tests/paletteTailwind.test.ts` · `tailwind.config pal` · after first test
- **Do:** Import tailwindConfig from '../tailwind.config'. Add test asserting tailwindConfig.theme?.extend?.colors?.pal toEqual paletteTailwindColors and colors.background toBe 'hsl(var(--background))'.
- **Run:** `cd game/frontend && npx vitest run tests/paletteTailwind.test.ts`
- **Expected:** Both tests pass.

## Acceptance criteria
- Tests assert every palette colour appears once in paletteTailwindColors.
- Tests assert tailwind config exposes pal and keeps old tokens.

## Definition of done
- tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-770.md`

## Links
- Evidence: EVD-156
- Requirement: REQ-384
- Unit (Act): UNIT-767
- Unit (Verify): UNIT-770
- Status: completed
- Change: UPDATE
