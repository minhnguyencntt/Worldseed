# UNIT-451 — Verify: test script includes the tracked-dependency guard

## Summary
Unit test reads package.json and asserts the guard precedes vitest.

## Description
Unit test that proves REQ3: the package.json test script runs the guard before vitest.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/testScriptGuard.test.ts` · `new: it('test script runs the guard before vitest')` · new
- **Do:** Read ../package.json via readFileSync(new URL('../package.json', import.meta.url)), JSON.parse, take scripts.test; expect it toContain 'scripts/assertNoTrackedNodeModules.ts' and expect indexOf(guard) < indexOf('vitest run') and toContain '&&'.
- **Run:** `cd game/frontend && npx vitest run tests/testScriptGuard.test.ts`
- **Expected:** Test passes.

## Acceptance criteria
- scripts.test includes the guard script path.
- Guard appears before 'vitest run'.

## Definition of done
- Test passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-451.md`

## Links
- Evidence: EVD-090
- Requirement: REQ-225
- Unit (Act): UNIT-448
- Unit (Verify): UNIT-451
- Status: completed
- Change: UPDATE
