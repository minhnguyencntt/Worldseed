# UNIT-449 — Verify: parseGitLsFiles and checkTrackedFiles unit tests and typed existing tests

## Summary
Unit tests for the new helpers with a fake runner, plus fix the type errors in the existing helper tests.

## Description
Tests prove REQ1 and fix the implicit-tuple type errors at tests/trackedNodeModules.test.ts lines 53, 68-69, 81.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/trackedNodeModules.test.ts` · `untrackNodeModules tests (vi.fn runners)` · L45-L84
- **Do:** Type each fake runner as vi.fn((_args: string[]) => '') so mock.calls tuples are [string[]] and remove the `as string[]` casts that cause TS2493/TS2352.

```
const run = vi.fn((_args: string[]) => '');
```

- **Run:** `cd game/frontend && npx tsc --noEmit 2>&1 | grep trackedNodeModules.test`
- **Expected:** No output (no type errors in this file).

### Step 2 — `game/frontend/tests/trackedNodeModules.test.ts` · `describe('parseGitLsFiles')` · after L84
- **Do:** Add tests: parseGitLsFiles('a\0b\0') toEqual ['a','b']; parseGitLsFiles('') toEqual [].
- **Run:** `cd game/frontend && npx vitest run tests/trackedNodeModules.test.ts -t parseGitLsFiles`
- **Expected:** Both tests pass.

### Step 3 — `game/frontend/tests/trackedNodeModules.test.ts` · `describe('checkTrackedFiles')` · after L84
- **Do:** Add tests with run = vi.fn((_a: string[]) => 'src/a.ts\0node_modules/x.js\0game/frontend/node_modules/.vite/vitest/results.json\0'): expect result toEqual the last two paths and run toHaveBeenCalledWith(['ls-files','-z']); a second test with only 'src/a.ts\0' returns [].
- **Run:** `cd game/frontend && npx vitest run tests/trackedNodeModules.test.ts -t checkTrackedFiles`
- **Expected:** Tests pass.

## Acceptance criteria
- parseGitLsFiles drops empty entries.
- checkTrackedFiles returns dependency and vitest-cache paths via fake runner.
- tsc reports no errors in tests/trackedNodeModules.test.ts.

## Definition of done
- Tests pass and typecheck clean for this file
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-449.md`

## Links
- Evidence: EVD-090
- Requirement: REQ-223
- Unit (Act): UNIT-446
- Unit (Verify): UNIT-449
- Status: completed
- Change: UPDATE
