# UNIT-207 — Verify: MaxRetries exhaustion removes the worktree once unit tests

## Summary
Unit test for retry exhaustion cleanup

## Description
Add a test with MaxRetries 2 and three failing calls asserting attempts, FAILED status and one worktree removal.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/worker/internal/runner/runner_retry_cleanup_test.go` · `new: TestRunRetryExhaustedRemovesWorktreeOnce` · new
- **Do:** Use agent := &fakeAgent{errs: []error{errors.New("e1"), errors.New("e2"), errors.New("e3")}} and newRunner(t, Config{MaxRetries: 2, Timeout: 5 * time.Second}, agent); call Run("EXEC-1","ROUND-0000001"); assert err != nil, agent.calls == 3, stored Status == store.StatusFailed, stored Error contains "e3", and h.trees.removed equals []string{filepath.Join(h.cfg.WorkRoot, "EXEC-1")}.
- **Run:** `cd backend/worker && go test ./internal/runner -run TestRunRetryExhaustedRemovesWorktreeOnce`
- **Expected:** Test passes

## Acceptance criteria
- agent.calls is 3 and stored status FAILED with last error text
- trees.removed has exactly one entry equal to WorkRoot/EXEC-1

## Definition of done
- Test passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-207.md`

## Links
- Evidence: EVD-041
- Requirement: REQ-103
- Unit (Act): UNIT-204
- Unit (Verify): UNIT-207
- Status: completed
- Change: UPDATE
