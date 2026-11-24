# UNIT-834 — Verify: Token values come from the palette and Tailwind exposes them

## Summary
Unit tests for tokens and Tailwind config

## Description
Test tokens against PALETTE and the Tailwind config exports.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/tokens.test.ts` · `new: describe('design tokens')` · new
- **Do:** Add test 'colour tokens come from the palette': flatten Object.values(COLOR_TOKENS) and assert every hex is in PALETTE. Add test 'css vars': call tokensToCssVars and assert it has --sf-color-brass-4 equal to PALETTE_RAMPS.brass[3], --sf-space-2 equal to '8px' and --sf-font-pixel containing 'Press Start 2P'.
- **Run:** `npx vitest run tests/tokens.test.ts`
- **Expected:** Both token tests pass

### Step 2 — `game/frontend/tests/tokens.test.ts` · `it('tailwind config exposes tokens')` · after the previous tests
- **Do:** Import tailwind.config; assert theme.extend.colors.sf['brass-4'] (or the structure A1 wrote) is 'var(--sf-color-brass-4)', theme.extend.spacing['sf-2'] is 'var(--sf-space-2)', fontFamily.pixel is 'var(--sf-font-pixel)', colors.background still 'hsl(var(--background))'.
- **Run:** `npx vitest run tests/tokens.test.ts`
- **Expected:** Test passes and the existing paletteTailwind test is unaffected

## Acceptance criteria
- Every colour token is in PALETTE
- Tailwind config exposes sf theme values referencing CSS vars

## Definition of done
- tokens.test.ts passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-834.md`

## Links
- Evidence: EVD-168
- Requirement: REQ-415
- Unit (Act): UNIT-830
- Unit (Verify): UNIT-834
- Status: completed
- Change: UPDATE
