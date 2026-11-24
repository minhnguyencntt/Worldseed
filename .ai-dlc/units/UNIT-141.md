# UNIT-141 — Verify: AdminApp execution handlers call the client and reload unit tests

## Summary
Unit tests with a mocked fetch for approve, retry and reject

## Description
Add game/frontend/tests/adminActions.test.tsx modelled on tests/adminExecution.test.tsx. It stubs fetch by URL and Bearer token, counts the GET calls to the executions endpoint to prove the reload, and uses fixtures from tests/fixtures/api.ts.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/fixtures/api.ts` · `new: awaitingExecutionFixture` · after L47
- **Do:** Export awaitingExecutionFixture as { ...executionFixture, status: 'AWAITING_APPROVAL' }, mirroring execution.Execution in backend/internal/execution/execution.go.

```
export const awaitingExecutionFixture = { ...executionFixture, status: 'AWAITING_APPROVAL' };
```

- **Run:** `cd game/frontend && npx tsc --noEmit`
- **Expected:** Fixture importable by tests and type-check passes

### Step 2 — `game/frontend/tests/adminActions.test.tsx` · `new: describe('AdminApp execution actions') / it('Approve posts and reloads')` · new
- **Do:** Copy the stubFetch and enterToken helpers from adminExecution.test.tsx, extended to answer POST /api/v1/admin/executions/exec-1/approve with json(awaitingExecutionFixture). Render AdminApp, enter token 'secret', click the Approve button and assert fetch was called with that URL, method POST and Authorization 'Bearer secret'. Then await waitFor that the GET executions call count is 2.
- **Run:** `cd game/frontend && npx vitest run tests/adminActions.test.tsx -t Approve`
- **Expected:** Test passes

### Step 3 — `game/frontend/tests/adminActions.test.tsx` · `it('Reject posts and reloads')` · new
- **Do:** Same as the approve test with status AWAITING_APPROVAL, clicking the Reject button and asserting the /reject URL with POST and a second executions GET.
- **Run:** `cd game/frontend && npx vitest run tests/adminActions.test.tsx -t Reject`
- **Expected:** Test passes

### Step 4 — `game/frontend/tests/adminActions.test.tsx` · `it('Retry posts and reloads')` · new
- **Do:** Use failedExecutionFixture, click the Retry button and assert POST to /api/v1/admin/executions/exec-1/retry and a second executions GET.
- **Run:** `cd game/frontend && npx vitest run tests/adminActions.test.tsx -t Retry`
- **Expected:** Test passes

## Acceptance criteria
- Approve, Reject and Retry each POST to the matching URL with the Bearer token
- Each action is followed by a second GET of the executions endpoint

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-141.md`

## Links
- Evidence: EVD-030
- Requirement: REQ-070
- Unit (Act): UNIT-139
- Unit (Verify): UNIT-141
- Status: completed
- Change: UPDATE
