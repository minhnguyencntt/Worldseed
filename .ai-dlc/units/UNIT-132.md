# UNIT-132 — Verify: AdminApp approve, retry, reject and 401 unit tests with mocked fetch

## Summary
Test each AdminApp execution action

## Description
Extend adminExecution.test.tsx with a url-routing fetch stub for approve, retry and reject POSTs.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/adminExecution.test.tsx` · `describe('AdminApp execution actions')` · after L80
- **Do:** Add a describe using stubFetch extended so POST /api/v1/admin/executions/exec-1/{approve|retry|reject} responses come from a per-test responder. Tests: (a) AWAITING_APPROVAL fixture ({...executionFixture,status:'AWAITING_APPROVAL'}): click Approve, assert POST to .../approve with Bearer secret and that the executions URL was fetched twice; (b) failedExecutionFixture: click Retry, same assertions on .../retry; (c) AWAITING_APPROVAL: click Reject, assert POST .../reject and refetch; (d) action responds 401: assert screen.getByLabelText('Admin token') and text 'Invalid token' appear; (e) action responds 500: assert role alert contains '500'.
- **Run:** `cd game/frontend && npx vitest run tests/adminExecution.test.tsx`
- **Expected:** All AdminApp execution tests pass

## Acceptance criteria
- Each action hits its endpoint and re-fetches executions
- 401 returns to token gate
- 500 shows alert

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-132.md`

## Links
- Evidence: EVD-026
- Requirement: REQ-066
- Unit (Act): UNIT-129
- Unit (Verify): UNIT-132
- Status: completed
- Change: UPDATE
