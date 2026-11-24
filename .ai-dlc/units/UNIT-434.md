# UNIT-434 — Verify: untrackNodeModules cleanup unit tests with a fake git runner

## Summary
Test cleanup args

## Description
Unit tests using a vi.fn git runner.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/untrackNodeModules.test.ts` · `new: untrackNodeModules tests` · new
- **Do:** With a vi.fn runner returning 'README.md\ngame/frontend/node_modules/phaser/a.ts\ngame/frontend/node_modules/.vite/r.json' for ['ls-files'], assert second call equals ['rm','-r','--cached','--ignore-unmatch','--','game/frontend/node_modules'] and the call args contain no '--force'; with a clean listing assert only one call occurred.
- **Run:** `cd game/frontend && npx vitest run tests/untrackNodeModules.test.ts`
- **Expected:** All cleanup tests pass

## Acceptance criteria
- rm called with --cached and roots
- No rm when clean
- No --force argument passed

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-434.md`

## Links
- Evidence: EVD-087
- Requirement: REQ-216
- Unit (Act): UNIT-431
- Unit (Verify): UNIT-434
- Status: approved
- Change: UPDATE
