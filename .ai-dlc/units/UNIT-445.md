# UNIT-445 — Verify: test script runs the tracked-dependency guard unit tests

## Summary
Unit tests that package.json wires the guard before vitest and the script uses the helper

## Description
Read the real package.json and script source and assert wiring.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/testScriptGuard.test.ts` · `new: test script wiring` · new
- **Do:** Create test reading package.json via readFileSync(new URL('../package.json', import.meta.url)); assert scripts['guard:tracked-deps'] contains 'assertNoTrackedNodeModules.ts' and scripts.test matches /^npm run guard:tracked-deps && vitest run/.
- **Run:** `cd game/frontend && npx vitest run tests/testScriptGuard.test.ts`
- **Expected:** Wiring test passes

### Step 2 — `game/frontend/tests/testScriptGuard.test.ts` · `new: guard script source` · new
- **Do:** Add test reading scripts/assertNoTrackedNodeModules.ts source and asserting it contains 'checkTrackedFiles' and 'ls-files' is not hard-coded there (delegated to the helper); also assert checkTrackedFiles with a fake run returning 'node_modules/a.js\0' throws.
- **Run:** `cd game/frontend && npx vitest run tests/testScriptGuard.test.ts`
- **Expected:** All tests in the file pass

## Acceptance criteria
- scripts.test starts with the guard before vitest run
- guard script imports checkTrackedFiles

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-445.md`

## Links
- Evidence: EVD-089
- Requirement: REQ-222
- Unit (Act): UNIT-443
- Unit (Verify): UNIT-445
- Status: approved
- Change: UPDATE
