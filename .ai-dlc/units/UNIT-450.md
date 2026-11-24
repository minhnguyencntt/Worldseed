# UNIT-450 — Verify: runGuard and guard script unit tests with a fake git runner

## Summary
Unit tests for runGuard exit codes and the script file's existence and tracking.

## Description
Tests prove REQ2 using fake runners and a log spy; script presence checked on disk.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/assertNoTrackedGuard.test.ts` · `new: describe('runGuard')` · new
- **Do:** Add test 1: run = vi.fn((_a: string[]) => 'node_modules/x.js\0'), log = vi.fn(); expect runGuard(run, log) toBe 1 and log toHaveBeenCalledWith('node_modules/x.js'). Test 2: run returns 'src/a.ts\0'; expect 0 and log not called.
- **Run:** `cd game/frontend && npx vitest run tests/assertNoTrackedGuard.test.ts -t runGuard`
- **Expected:** Both tests pass.

### Step 2 — `game/frontend/tests/assertNoTrackedGuard.test.ts` · `new: it('guard script exists')` · new
- **Do:** Read scripts/assertNoTrackedNodeModules.ts with readFileSync relative to import.meta.dirname and expect it toContain 'runGuard' and 'process.exit'.
- **Run:** `cd game/frontend && npx vitest run tests/assertNoTrackedGuard.test.ts -t 'guard script'`
- **Expected:** Test passes.

## Acceptance criteria
- runGuard returns 1 and logs offenders.
- runGuard returns 0 for clean listing.
- Script file exists and imports runGuard.

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-450.md`

## Links
- Evidence: EVD-090
- Requirement: REQ-224
- Unit (Act): UNIT-447
- Unit (Verify): UNIT-450
- Status: completed
- Change: UPDATE
