# UNIT-154 — Verify: rejectExecution id encoding and Reject failure display unit tests

## Summary
Add id-encoding and Reject 500 tests

## Description
Add one test to executions.test.ts and one to adminActions.test.tsx.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/executions.test.ts` · `describe rejectExecution: it encodes the id in the URL` · after L77
- **Do:** Add a test that stubs fetch with vi.fn resolving a JSON Response of the execution fixture already used in this describe, calls rejectExecution('tok', 'a/b c'), and asserts the first fetch argument equals '/api/v1/admin/executions/a%2Fb%20c/reject'.
- **Run:** `npx vitest run tests/executions.test.ts -t "encodes the id"`
- **Expected:** Test passes

### Step 2 — `game/frontend/tests/adminActions.test.tsx` · `it: reject endpoint returns 500 shows the message` · after L205
- **Do:** Add a test using stubActionFetch([{ ...executionFixture, status: 'AWAITING_APPROVAL' }], () => json({ error: 'boom' }, 500)), click Reject, and assert within the 'Execution' region an alert has text 'boom'.
- **Run:** `npx vitest run tests/adminActions.test.tsx -t "reject endpoint returns 500"`
- **Expected:** Test passes

## Acceptance criteria
- rejectExecution encodes reserved characters in the id
- Reject 500 shows the server message in an alert

## Definition of done
- Both tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-154.md`

## Links
- Evidence: EVD-033
- Requirement: REQ-077
- Unit (Act): UNIT-152
- Unit (Verify): UNIT-154
- Status: completed
- Change: UPDATE
