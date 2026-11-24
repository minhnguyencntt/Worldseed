# UNIT-138 — Verify: ExecutionPanel Reject button unit tests

## Summary
Unit tests for Reject visibility and callback, and unchanged Approve/Retry

## Description
Add a new test file rendering ExecutionPanel directly with vi.fn callbacks, asserting Reject gating and that Approve and Retry still work.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/executionReject.test.tsx` · `new: renderPanel helper` · new
- **Do:** Create the file with imports from @testing-library/react, userEvent, vitest, ExecutionPanel and executionFixture from ./fixtures/api (the ExecutionInfo contract); add renderPanel(status, withReject = true) rendering ExecutionPanel with execution {...executionFixture, id: 'EX1', status}, contributionCount 2 and vi.fn onApprove, onRetry and optional onReject, plus afterEach(cleanup).
- **Run:** `cd game/frontend && npx vitest run tests/executionReject.test.tsx`
- **Expected:** Helper renders the panel and returns the mocks; the file is collected by vitest without import errors

### Step 2 — `game/frontend/tests/executionReject.test.tsx` · `it: shows Reject for AWAITING_APPROVAL and calls onReject with the id` · new
- **Do:** Render with status AWAITING_APPROVAL, click the button named Reject, assert onReject called once with 'EX1' and onApprove/onRetry not called.
- **Run:** `cd game/frontend && npx vitest run tests/executionReject.test.tsx -t "shows Reject for AWAITING_APPROVAL"`
- **Expected:** Test passes

### Step 3 — `game/frontend/tests/executionReject.test.tsx` · `it: hides Reject without onReject or for non-awaiting statuses` · new
- **Do:** Render AWAITING_APPROVAL without onReject, then FAILED and RUNNING with onReject; assert queryByRole('button', {name:'Reject'}) is not in the document each time.
- **Run:** `cd game/frontend && npx vitest run tests/executionReject.test.tsx -t "hides Reject"`
- **Expected:** Test passes

### Step 4 — `game/frontend/tests/executionReject.test.tsx` · `it: Approve and Retry still call their callbacks` · new
- **Do:** Render AWAITING_APPROVAL, click Approve, assert onApprove called with 'EX1'; render FAILED, click Retry, assert onRetry called with 'EX1'; assert onReject never called.
- **Run:** `cd game/frontend && npx vitest run tests/executionReject.test.tsx`
- **Expected:** All tests in executionReject.test.tsx pass

## Acceptance criteria
- Reject shows only for AWAITING_APPROVAL with onReject and calls onReject with the id
- Reject is hidden without onReject and for other statuses
- Approve and Retry still call their callbacks with the id

## Definition of done
- All tests in the new file pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-138.md`

## Links
- Evidence: EVD-029
- Requirement: REQ-069
- Unit (Act): UNIT-137
- Unit (Verify): UNIT-138
- Status: completed
- Change: NEW
