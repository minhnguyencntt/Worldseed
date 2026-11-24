# UNIT-187 — Verify: Runner retry and budget unit tests

## Summary
Unit tests for retries and budget stop with fake agent

## Description
Write runner_retry_test.go reusing fakes from runner_test.go to prove A2 against R2 criteria.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/worker/internal/runner/runner_retry_test.go` · `TestRunRetriesThenSucceeds` · new
- **Do:** cfg MaxRetries 2, MaxBudget 100, Timeout 5s; agent.errs = [errors.New("x"), errors.New("y"), nil]; Run; assert err nil, agent.calls==3 and stored Attempt==3.
- **Run:** `cd backend/worker && go test ./internal/runner -run TestRunRetriesThenSucceeds`
- **Expected:** Test passes

### Step 2 — `backend/worker/internal/runner/runner_retry_test.go` · `TestRunRetryExhausted` · new
- **Do:** MaxRetries 1; agent.errs = two errors; Run; assert agent.calls==2, stored Status FAILED and Error contains the second error text.
- **Run:** `cd backend/worker && go test ./internal/runner -run TestRunRetryExhausted`
- **Expected:** Test passes

### Step 3 — `backend/worker/internal/runner/runner_retry_test.go` · `TestRunBudgetExceeded` · new
- **Do:** agent.cost=3.0, MaxBudget 5.0, MaxRetries 5, errs all non-nil; Run; assert errors.Is(err, ErrBudgetExceeded) and agent.calls==2.
- **Run:** `cd backend/worker && go test ./internal/runner -run TestRunBudgetExceeded`
- **Expected:** Test passes

## Acceptance criteria
- Retry success, retry exhaustion and budget stop each tested
- No real agent or network

## Definition of done
- go test ./internal/runner -run 'TestRun(Retry|Budget)' passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-187.md`

## Links
- Evidence: EVD-038
- Requirement: REQ-093
- Unit (Act): UNIT-184
- Unit (Verify): UNIT-187
- Status: completed
- Change: UPDATE
