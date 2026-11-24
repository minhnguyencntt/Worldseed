# UNIT-455 — Verify: runUntrack exit code and script unit tests

## Summary
Unit tests for runUntrack success, failure and script wiring

## Description
Add tests/untrackScript.test.ts covering runUntrack with fake runner and log/err spies, and a check that the script source uses runUntrack.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/untrackScript.test.ts` · `new: runUntrack tests` · new
- **Do:** Create a vitest file with three tests. (1) fake runner returning 'node_modules/a\0' then '' for ls-files; vi.fn log and err; expect return 0, log called with 'untracked 1 paths', err not called. (2) fake runner whose second ls-files listing is 'node_modules/a\0'; expect return 1 and err called with a message containing 'node_modules/a'. (3) readFileSync of scripts/untrackNodeModules.ts contains 'runUntrack' and 'process.exitCode'.
- **Run:** `npx vitest run tests/untrackScript.test.ts`
- **Expected:** Three tests pass

## Acceptance criteria
- Success logs count and returns 0
- Failure logs error and returns 1
- Script source references runUntrack and no longer calls untrackNodeModules directly

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-455.md`

## Links
- Evidence: EVD-091
- Requirement: REQ-227
- Unit (Act): UNIT-453
- Unit (Verify): UNIT-455
- Status: approved
- Change: UPDATE
