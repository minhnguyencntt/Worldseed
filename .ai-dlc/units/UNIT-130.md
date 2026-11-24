# UNIT-130 — Verify: rejectExecution unit tests with mocked fetch

## Summary
Test rejectExecution request and 401

## Description
Unit tests with stubbed global fetch for rejectExecution.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/executions.test.ts` · `describe('rejectExecution')` · after L42
- **Do:** Add describe('rejectExecution') with two tests following the listExecutions tests: (1) stub fetch to return executionFixture status 200, call rejectExecution('secret','exec-1'), assert fetch called with '/api/v1/admin/executions/exec-1/reject', method 'POST', Authorization 'Bearer secret', and result equals executionFixture; (2) stub fetch with status 401 and assert rejection is ApiError with status 401.
- **Run:** `cd game/frontend && npx vitest run tests/executions.test.ts -t rejectExecution`
- **Expected:** Both rejectExecution tests pass

## Acceptance criteria
- POST path and Bearer header asserted
- 401 yields ApiError

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-130.md`

## Links
- Evidence: EVD-026
- Requirement: REQ-064
- Unit (Act): UNIT-127
- Unit (Verify): UNIT-130
- Status: completed
- Change: UPDATE
