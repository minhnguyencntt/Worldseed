# UNIT-876 — Verify: Base typography and backdrop CSS unit tests

## Summary
Unit test reads styles.css text and asserts the base rules.

## Description
Write tests/baseTypography.test.ts that reads src/styles.css with node:fs and asserts the rules, from R1 acceptance criteria.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/baseTypography.test.ts` · `new: base typography rules` · new
- **Do:** Add test 'base rules' that readFileSync's src/styles.css and expects it to match /body\s*{[^}]*var\(--sf-color-ink-1\)/, /var\(--sf-color-parchment-5\)/, /font-size:\s*20px/, /h1, h2\s*{[^}]*--sf-font-pixel/, and contain '.sf-dialog' and '.sf-fullscreen-bg'.
- **Run:** `cd game/frontend && npx vitest run tests/baseTypography.test.ts`
- **Expected:** The test passes.

## Acceptance criteria
- body rule uses ink-1, parchment-5, VT323 20px
- h1,h2 use the pixel font and sf-dialog exists

## Definition of done
- Test passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-876.md`

## Links
- Evidence: EVD-174
- Requirement: REQ-436
- Unit (Act): UNIT-872
- Unit (Verify): UNIT-876
- Status: approved
- Change: UPDATE
