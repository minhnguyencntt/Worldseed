# UNIT-116 — Verify: Approve and retry action unit tests

## Summary
Mocked-fetch tests for approve, retry and conflicts

## Description
Unit tests for the action buttons with stubbed fetch.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/actions.test.tsx` · `new: describe('ExecutionPanel actions')` · new
- **Do:** Tests rendering ExecutionPanel with executionFixture overridden status: 'AWAITING_APPROVAL' shows Approve and click calls onApprove with the id; 'FAILED' shows Retry and click calls onRetry; 'RUNNING' shows neither; actionError 'execution: illegal state' renders in role alert; plus a client test stubbing fetch asserting approveExecution('t','EX1') POSTs /api/v1/admin/executions/EX1/approve with Authorization 'Bearer t' and retryExecution hits /retry
- **Run:** `cd game/frontend && npx vitest run tests/actions.test.tsx`
- **Expected:** All tests pass

## Acceptance criteria
- Approve POST
- Approve click sends the POST request for the Retry action too: Retry POST is covered by its own test
- No buttons otherwise
- A 409 message is shown in an alert

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-116.md`

## Links
- Evidence: EVD-022
- Requirement: REQ-058
- Unit (Act): UNIT-111
- Unit (Verify): UNIT-116
- Status: completed
- Change: UPDATE
