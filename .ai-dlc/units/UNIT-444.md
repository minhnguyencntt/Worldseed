# UNIT-444 — Verify: tracked dependency helpers unit tests

## Summary
Unit tests for trackedDependencyPaths, parseGitLsFiles and checkTrackedFiles

## Description
Prove the helpers with a fake git runner.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/trackedDependencyGuard.test.ts` · `new: trackedDependencyPaths tests` · new
- **Do:** Create the test file; test that ['node_modules/phaser/a.js','src/.vite/r.json','src/a.ts','src/my_node_modules_note.ts'] yields the first two only, and [] yields [].
- **Run:** `cd game/frontend && npx vitest run tests/trackedDependencyGuard.test.ts -t trackedDependencyPaths`
- **Expected:** Filter tests pass

### Step 2 — `game/frontend/tests/trackedDependencyGuard.test.ts` · `new: parseGitLsFiles and checkTrackedFiles tests` · new
- **Do:** Test parseGitLsFiles('a\0b\0') equals ['a','b']; test checkTrackedFiles with fake run returning 'src/a.ts\0node_modules/x.js\0' throws matching /node_modules\/x.js/ and that run was called with ['ls-files','-z']; test clean output 'src/a.ts\0' does not throw.
- **Run:** `cd game/frontend && npx vitest run tests/trackedDependencyGuard.test.ts`
- **Expected:** All tests in the file pass

## Acceptance criteria
- Flags node_modules and .vite paths, ignores look-alikes
- checkTrackedFiles throws with a tracked path and passes on clean output

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-444.md`

## Links
- Evidence: EVD-089
- Requirement: REQ-221
- Unit (Act): UNIT-442
- Unit (Verify): UNIT-444
- Status: approved
- Change: UPDATE
