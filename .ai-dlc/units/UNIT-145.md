# UNIT-145 — Verify: AdminApp execution handlers call the client and reload unit tests

## Summary
Mocked-fetch tests for approve, retry, reject and reload.

## Description
Add tests/adminActions.test.tsx using the url-routing fetch stub pattern of tests/adminExecution.test.tsx.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/adminActions.test.tsx` · `new: AdminApp execution handlers` · new
- **Do:** Create jsdom test file with a stubFetch copied in shape from tests/adminExecution.test.tsx; payloads come from tests/fixtures/api.ts (failedExecutionFixture, roundFixture; mirrors ExecutionInfo in src/api/client.ts and the admin execution handlers). Add three tests: FAILED fixture + click Retry asserts POST /api/v1/admin/executions/{id}/retry with Authorization 'Bearer secret' and a second GET to /api/v1/admin/executions; same for AWAITING_APPROVAL (fixture spread with status) clicking Approve and Reject.
- **Run:** `cd game/frontend && npx vitest run tests/adminActions.test.tsx`
- **Expected:** The three tests pass.

## Acceptance criteria
- Approve/Reject/Retry POST the right URL with Bearer secret
- Executions endpoint is fetched again after each action

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-145.md`

## Links
- Evidence: EVD-031
- Requirement: REQ-072
- Unit (Act): UNIT-143
- Unit (Verify): UNIT-145
- Status: completed
- Change: NEW
