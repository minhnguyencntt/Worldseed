# UNIT-136 — Verify: ExecutionPanel Reject button unit tests

## Summary
Unit tests for Reject visibility and callback.

## Description
Add game/frontend/tests/reject.test.tsx rendering ExecutionPanel with executionFixture from tests/fixtures/api.ts (mirrors the ExecutionInfo type in src/api/client.ts) and vi.fn callbacks; no network.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/reject.test.tsx` · `new: describe('ExecutionPanel Reject')` · new
- **Do:** Create the file importing render, screen, cleanup, userEvent, vi, ExecutionPanel and executionFixture (tests/fixtures/api.ts, matching ExecutionInfo in src/api/client.ts). Add test 'shows Reject for AWAITING_APPROVAL and calls onReject with id': render with {...executionFixture,id:'EX1',status:'AWAITING_APPROVAL'}, onReject=vi.fn(), onApprove=vi.fn(); click button named Reject; assert onReject called once with 'EX1' and onApprove not called.
- **Run:** `cd game/frontend && npx vitest run tests/reject.test.tsx -t 'calls onReject'`
- **Expected:** Test passes.

### Step 2 — `game/frontend/tests/reject.test.tsx` · `new: it('hides Reject unless awaiting approval with onReject')` · new
- **Do:** Add a test.each over statuses 'FAILED' and 'RUNNING' rendering with onReject=vi.fn() and asserting queryByRole('button',{name:'Reject'}) is null; add one case with status AWAITING_APPROVAL and no onReject asserting Reject is null and Approve button (onApprove given) is present.
- **Run:** `cd game/frontend && npx vitest run tests/reject.test.tsx`
- **Expected:** All tests in reject.test.tsx pass.

## Acceptance criteria
- Test asserts Reject shown and onReject called with 'EX1' for AWAITING_APPROVAL
- Test asserts Reject absent for FAILED, RUNNING, and for AWAITING_APPROVAL without onReject

## Definition of done
- All reject tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-136.md`

## Links
- Evidence: EVD-028
- Requirement: REQ-068
- Unit (Act): UNIT-135
- Unit (Verify): UNIT-136
- Status: completed
- Change: UPDATE
