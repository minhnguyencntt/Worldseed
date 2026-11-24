# UNIT-126 — Verify: AdminApp ExecutionPanel unit tests with mocked fetch

## Summary
Unit tests for ExecutionPanel rendering inside AdminApp

## Description
Add tests/adminExecution.test.tsx reusing the url-routing fetch stub pattern of tests/adminStepper.test.tsx and fixtures from tests/fixtures/api.ts.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/fixtures/api.ts` · `new: failedExecutionFixture` · after L50
- **Do:** Export failedExecutionFixture, spreading executionFixture and overriding status 'FAILED', error 'build failed', log 'agent log line', tests 'tests: 3 passed', release_version '1.1.0'. Mirrors ExecutionInfo in game/frontend/src/api/client.ts and execution.Execution in backend/internal/execution/execution.go.

```
export const failedExecutionFixture = { ...executionFixture, status: 'FAILED', error: 'build failed', log: 'agent log line', tests: 'tests: 3 passed', release_version: '1.1.0' };
```

- **Run:** `cd game/frontend && npx tsc --noEmit`
- **Expected:** Type-check passes with the new fixture

### Step 2 — `game/frontend/tests/adminExecution.test.tsx` · `new: AdminApp execution panel (stubFetch, enterToken helpers)` · new
- **Do:** Create the file with '// @vitest-environment jsdom', copy the stubFetch/json/enterToken helpers from tests/adminStepper.test.tsx (current-round, admin round, contributions and executions URLs; Bearer secret auth), with stubFetch taking an executions responder.
- **Run:** `cd game/frontend && npx vitest run tests/adminExecution.test.tsx`
- **Expected:** File is collected by vitest

### Step 3 — `game/frontend/tests/adminExecution.test.tsx` · `it('Given a FAILED execution with details, when AdminApp loads, then the Execution region shows them')` · new
- **Do:** Stub executions to return [failedExecutionFixture]; render AdminApp, enterToken('secret'), await screen.findByRole('region', {name:'Execution'}); assert text contains 'Contributions: 1', 'agent log line', 'tests: 3 passed', '1.1.0' and 'Failure reason: build failed'.
- **Run:** `cd game/frontend && npx vitest run tests/adminExecution.test.tsx -t 'FAILED execution'`
- **Expected:** Test passes

### Step 4 — `game/frontend/tests/adminExecution.test.tsx` · `it('Given no executions, when AdminApp loads, then placeholders are shown')` · new
- **Do:** Stub executions to return []; render, enter token, await the Execution region; assert 'Contributions: 1' and that the region has three 'Not available' occurrences for logs, tests and release version plus the duration, and no 'Failure reason' text.
- **Run:** `cd game/frontend && npx vitest run tests/adminExecution.test.tsx -t 'no executions'`
- **Expected:** Test passes

## Acceptance criteria
- Test with a full execution asserts count, logs, tests, release version and failure reason
- Test with no executions asserts Not available placeholders and count

## Definition of done
- New tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-126.md`

## Links
- Evidence: EVD-025
- Requirement: REQ-063
- Unit (Act): UNIT-125
- Unit (Verify): UNIT-126
- Status: completed
- Change: UPDATE
