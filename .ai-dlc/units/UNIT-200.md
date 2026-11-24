# UNIT-200 — Verify: Retry limit and budget boundary unit tests

## Summary
Unit tests for MaxRetries 0, unlimited budget and exact-budget boundary

## Description
Add table-free tests in a new file with fakeAgent cost and errs queues.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/worker/internal/runner/runner_budget_test.go` · `new: TestRunZeroRetriesRunsOnce` · new
- **Do:** fakeAgent{errs: []error{errors.New("x")}}, Config{MaxRetries:0, MaxBudget:100}; assert Run errors, agent.calls == 1, returned Execution.Attempt == 1 and !errors.Is(err, ErrBudgetExceeded).
- **Run:** `cd backend/worker && go test ./internal/runner -run TestRunZeroRetriesRunsOnce`
- **Expected:** Test passes

### Step 2 — `backend/worker/internal/runner/runner_budget_test.go` · `new: TestRunZeroBudgetUnlimited` · new
- **Do:** fakeAgent{cost:100, errs: three errors}, Config{MaxRetries:2, MaxBudget:0}; assert agent.calls == 3 and !errors.Is(err, ErrBudgetExceeded).
- **Run:** `cd backend/worker && go test ./internal/runner -run TestRunZeroBudgetUnlimited`
- **Expected:** Test passes

### Step 3 — `backend/worker/internal/runner/runner_budget_test.go` · `new: TestRunBudgetEqualNotExceeded` · new
- **Do:** fakeAgent{cost:2.5, errs: three errors}, Config{MaxRetries:2, MaxBudget:5.0}; assert agent.calls == 3 and !errors.Is(err, ErrBudgetExceeded).
- **Run:** `cd backend/worker && go test ./internal/runner -run TestRunBudgetEqualNotExceeded`
- **Expected:** Test passes

## Acceptance criteria
- MaxRetries 0 runs once
- MaxBudget 0 is unlimited
- Spend equal to budget does not stop retries

## Definition of done
- All three tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-200.md`

## Links
- Evidence: EVD-040
- Requirement: REQ-099
- Unit (Act): UNIT-196
- Unit (Verify): UNIT-200
- Status: completed
- Change: UPDATE
