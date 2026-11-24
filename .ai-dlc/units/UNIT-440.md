# UNIT-440 — Verify: untrackNodeModules cleanup unit tests with a fake git runner

## Summary
Test cleanup commands.

## Description
Unit tests with vi.fn runner.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/trackedNodeModules.test.ts` · `new: describe('untrackNodeModules')` · new
- **Do:** Create run = vi.fn(() => ''); call untrackNodeModules(run); assert a call contains 'rm','-r','--cached','node_modules'; assert every call includes '--cached'; assert a call contains 'node_modules/.vite/vitest/results.json'.
- **Run:** `cd game/frontend && npx vitest run tests/trackedNodeModules.test.ts -t untrackNodeModules`
- **Expected:** Tests pass.

## Acceptance criteria
- Issues git rm -r --cached
- No disk deletion; results.json unstaged

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-440.md`

## Links
- Evidence: EVD-088
- Requirement: REQ-219
- Unit (Act): UNIT-437
- Unit (Verify): UNIT-440
- Status: completed
- Change: NEW
