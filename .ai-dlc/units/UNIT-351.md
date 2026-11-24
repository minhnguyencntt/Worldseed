# UNIT-351 — Verify: zod dependency declaration unit tests

## Summary
Test zod declared in game/package.json

## Description
Unit test reads game/package.json from disk and asserts zod is declared and resolvable.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/tests/manifestDependency.test.ts` · `new: zod dependency declaration` · new
- **Do:** Create a vitest file that reads game/package.json via fs.readFileSync, parses it, asserts dependencies.zod matches /^\^?\d+\.\d+\.\d+/ and that await import('zod') exposes z.object as a function
- **Run:** `cd game && npx vitest run tests/manifestDependency.test.ts`
- **Expected:** Test passes, asserting zod declared and importable

## Acceptance criteria
- Test fails when zod is missing from dependencies
- Test passes after the Act

## Definition of done
- Test passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-351.md`

## Links
- Evidence: EVD-069
- Requirement: REQ-174
- Unit (Act): UNIT-348
- Unit (Verify): UNIT-351
- Status: completed
- Change: UPDATE
