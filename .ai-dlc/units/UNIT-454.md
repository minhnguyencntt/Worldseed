# UNIT-454 — Verify: untrackAndVerify unit tests with a fake git runner

## Summary
Unit tests for before count, leftover failure and dedupe

## Description
Add tests to tests/trackedNodeModules.test.ts proving untrackAndVerify with a fake GitRunner that returns scripted ls-files output.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/trackedNodeModules.test.ts` · `describe('untrackAndVerify')` · after L88
- **Do:** Add a describe with three tests using a fake runner that returns, for args[0]==='ls-files', the first scripted NUL-separated listing then the second, and '' for rm calls. Test 1: first listing 'node_modules/a\0node_modules/b\0node_modules/c\0', second '' → expect {before:3, after:0}. Test 2: second listing 'node_modules/phaser/package.json\0' → expect toThrow('node_modules/phaser/package.json'). Test 3: first listing repeats 'node_modules/.vite/vitest/results.json\0' three times → expect before 1.
- **Run:** `npx vitest run tests/trackedNodeModules.test.ts`
- **Expected:** All untrackAndVerify tests pass

## Acceptance criteria
- Returns {before:3, after:0} when second listing is empty
- Throws naming leftover path
- Counts triple-listed unmerged path once

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-454.md`

## Links
- Evidence: EVD-091
- Requirement: REQ-226
- Unit (Act): UNIT-452
- Unit (Verify): UNIT-454
- Status: approved
- Change: UPDATE
