# UNIT-169 — Verify: Runner locking, timeout, retry, budget and approval gate unit tests

## Summary
Unit tests with fake agent, worktrees, clock-free timeouts and temp dirs

## Description
Test the runner with fakeAgent and fakeTrees recording calls.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `worker/internal/runner/runner_test.go` · `new: TestRun_LockHeld, TestRun_Timeout, TestRun_RetryLimit` · new
- **Do:** LockHeld: pre-Acquire the lock path, assert errors.Is(err, lock.ErrLocked) and fakeTrees.added==0. Timeout: fakeAgent blocks until ctx.Done with ExecTimeout 5ms, MaxRetries 1; assert 2 attempts and errors.Is ErrTimeout recorded and status FAILED. RetryLimit: fakeAgent always errors, MaxRetries 2; assert 3 calls, status FAILED, and Remove called once
- **Run:** `cd worker && go test ./internal/runner -run 'TestRun_(LockHeld|Timeout|RetryLimit)'`
- **Expected:** Three tests pass

### Step 2 — `worker/internal/runner/runner_test.go` · `new: TestRun_Budget, TestRun_ApprovalGate, TestRun_Report` · new
- **Do:** Budget: fakeAgent returns cost 3 with error, MaxBudgetUSD 5, MaxRetries 5; assert ErrBudgetExceeded after 2 calls. ApprovalGate: success run leaves AWAITING_APPROVAL, Publish returns ErrNotApproved and callback not called; set record APPROVED via Store.Save then Publish calls callback and status COMPLETED; with AutoPublish true status is APPROVED. Report: read development/executions/<id>.report.json from the temp repo and assert Attempts, CostUSD, Status
- **Run:** `cd worker && go test ./internal/runner -run 'TestRun_(Budget|ApprovalGate|Report)'`
- **Expected:** Three tests pass

## Acceptance criteria
- Lock contention returns ErrLocked and creates no worktree
- Timeout triggers a retry and ends FAILED with ErrTimeout recorded
- Retry limit yields exactly MaxRetries+1 attempts and FAILED status
- Budget stop returns ErrBudgetExceeded before another attempt starts
- Approval gating blocks Publish until the record is APPROVED
- Report file exists with attempts, cost and status asserted

## Definition of done
- Tests pass in seconds
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-169.md`

## Links
- Evidence: EVD-035
- Requirement: REQ-084
- Unit (Act): UNIT-164
- Unit (Verify): UNIT-169
- Status: completed
- Change: UPDATE
