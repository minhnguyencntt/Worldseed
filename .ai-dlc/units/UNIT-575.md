# UNIT-575 — Verify: game tsconfig @game alias unit tests

## Summary
Unit test reads tsconfig.json and vitest.config.ts and asserts the alias agrees.

## Description
Context: ACT-A added the @game path to game/tsconfig.json. Desired behavior: a unit test asserts tsconfig and the vitest alias agree. Expected result: the test passes. Why: proves REQ-A from the spec before relying on the alias.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/tests/tsconfigAlias.test.ts` · `new: tsconfig @game alias` · new
- **Do:** Add test 'maps @game/* to ./src/*': readFileSync game/tsconfig.json, JSON.parse, expect compilerOptions.paths['@game/*'] toEqual ['./src/*']; add test that the resolved ./src dir exists via existsSync
- **Run:** `cd game && npx vitest run tests/tsconfigAlias.test.ts`
- **Expected:** Both tests pass

## Acceptance criteria
- paths['@game/*'] equals ['./src/*']
- vitest alias @game resolves to the same src folder

## Definition of done
- test passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-575.md`

## Links
- Evidence: EVD-115
- Requirement: REQ-286
- Unit (Act): UNIT-572
- Unit (Verify): UNIT-575
- Status: completed
- Change: UPDATE
