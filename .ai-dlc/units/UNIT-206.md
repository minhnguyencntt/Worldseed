# UNIT-206 — Verify: Timed-out attempt is retried once and fails with ErrTimeout unit tests

## Summary
Unit tests for ErrTimeout and timeout retry

## Description
Add tests using fakeAgent{block:true} and a 20ms Timeout, plus a cancelled-parent case.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/worker/internal/runner/runner_timeout_retry_test.go` · `new: TestRunTimeoutRetriedOnceThenErrTimeout` · new
- **Do:** Build agent := &fakeAgent{block: true} and h := newRunner(t, Config{MaxRetries: 1, Timeout: 20 * time.Millisecond}, agent); call h.r.Run(context.Background(), "EXEC-1", "ROUND-0000001"); assert agent.calls == 2, errors.Is(err, ErrTimeout), errors.Is(err, context.DeadlineExceeded), and h.st.Get("EXEC-1").Status == store.StatusFailed.
- **Run:** `cd backend/worker && go test ./internal/runner -run TestRunTimeoutRetriedOnceThenErrTimeout`
- **Expected:** Test passes

### Step 2 — `backend/worker/internal/runner/runner_timeout_retry_test.go` · `new: TestRunParentCancelNotErrTimeout` · new
- **Do:** Create ctx, cancel := context.WithCancel; cancel() immediately; use fakeAgent{block:true}, Config{MaxRetries: 0, Timeout: 5 * time.Second}; call Run with ctx and assert the error is non-nil, errors.Is(err, context.Canceled) is true and errors.Is(err, ErrTimeout) is false.
- **Run:** `cd backend/worker && go test ./internal/runner -run TestRunParentCancelNotErrTimeout`
- **Expected:** Test passes

## Acceptance criteria
- Timeout with MaxRetries 1 runs agent twice and wraps ErrTimeout and DeadlineExceeded
- Cancelled parent context does not wrap ErrTimeout

## Definition of done
- Both tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-206.md`

## Links
- Evidence: EVD-041
- Requirement: REQ-102
- Unit (Act): UNIT-203
- Unit (Verify): UNIT-206
- Status: completed
- Change: UPDATE
