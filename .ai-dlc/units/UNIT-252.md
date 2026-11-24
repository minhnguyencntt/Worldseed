# UNIT-252 — Verify: AdminApp makes no execution calls unit tests

## Summary
Tests prove AdminApp loads without the executions endpoint and keeps stepper and 401 behavior

## Description
Update tests/adminStepper.test.tsx and tests/adminWorld.test.tsx so they no longer stub the executions endpoint, and assert it is never requested.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/adminStepper.test.tsx` · `stubFetch / executions tests` · L1-L110
- **Do:** Remove executionFixture import, EXECUTIONS_URL branch and the executions option; delete the RUNNING-execution, 404 and 401-executions tests; add test 'Given a CLOSED round, then CLOSED is the current step and no executions URL was fetched' that asserts fetchMock.mock.calls has no URL equal to '/api/v1/admin/executions' and the single li[aria-current=step] text is CLOSED
- **Run:** `cd game/frontend && npx vitest run tests/adminStepper.test.tsx`
- **Expected:** Tests assert round-only stepper

### Step 2 — `game/frontend/tests/adminWorld.test.tsx` · `ADMIN_EXECUTIONS_URL stub` · L11, L32
- **Do:** Delete the ADMIN_EXECUTIONS_URL constant and its json([]) branch in the fetch stub
- **Run:** `cd game/frontend && npx vitest run tests/adminWorld.test.tsx`
- **Expected:** World title tests still pass

## Acceptance criteria
- Fetch is never called with /api/v1/admin/executions
- CLOSED round shows CLOSED as the single current step
- 401 from the round endpoint shows Invalid token

## Definition of done
- Updated tests green
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-252.md`

## Links
- Evidence: EVD-049
- Requirement: REQ-125
- Unit (Act): UNIT-249
- Unit (Verify): UNIT-252
- Status: completed
- Change: UPDATE
