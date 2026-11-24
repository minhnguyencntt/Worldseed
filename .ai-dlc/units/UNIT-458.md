# UNIT-458 — Verify: parseGitLsFiles and checkTrackedFiles dedupe conflict entries

## Summary
Unit tests with a mocked listing including conflict stages.

## Description
Add tests proving the parser dedupes conflict stage entries and checkTrackedFiles reports each path once.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/trackedNodeModules.test.ts` · `describe('parseGitLsFiles') > it('deduplicates conflict stage entries')` · after L104
- **Do:** Add a test calling parseGitLsFiles with '100644 aaa 1\tnode_modules/.vite/vitest/results.json\n100644 bbb 2\tnode_modules/.vite/vitest/results.json\n100644 ccc 3\tnode_modules/.vite/vitest/results.json\n' and expecting ['node_modules/.vite/vitest/results.json']; add a second case with NUL-separated triplicate plain path expecting one entry.
- **Run:** `npx vitest run tests/trackedNodeModules.test.ts -t parseGitLsFiles`
- **Expected:** Both cases pass.

### Step 2 — `game/frontend/tests/trackedNodeModules.test.ts` · `describe('checkTrackedFiles') > it('reports a conflicted path once')` · after L106
- **Do:** Add a test with a fake runner returning the triplicate 'node_modules/.vite/vitest/results.json' NUL listing plus 'src/a.ts'; assert the result equals ['node_modules/.vite/vitest/results.json'].
- **Run:** `npx vitest run tests/trackedNodeModules.test.ts -t checkTrackedFiles`
- **Expected:** Result has the path exactly once.

## Acceptance criteria
- Mocked listing with stages 1-3 yields one path.
- checkTrackedFiles reports results.json once.

## Definition of done
- New tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-458.md`

## Links
- Evidence: EVD-092
- Requirement: REQ-228
- Unit (Act): UNIT-456
- Unit (Verify): UNIT-458
- Status: completed
- Change: UPDATE
