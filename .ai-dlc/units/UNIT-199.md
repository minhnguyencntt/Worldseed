# UNIT-199 — Verify: Lock held and per-attempt timeout unit tests

## Summary
Unit tests for foreign lock preservation and per-attempt timeout

## Description
Add tests in a new file using fakeAgent, fakeTrees and the temp-dir rig from newRunner; no real Git or provider.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/worker/internal/runner/runner_lock_timeout_test.go` · `new: TestRunLockedKeepsForeignLock` · new
- **Do:** Build h via newRunner(t, Config{}, agent); create the file h.cfg.LockPath with os.WriteFile; call h.r.Run(ctx,"EXEC-1","ROUND-0000001"); assert errors.Is(err, lock.ErrLocked), os.Stat(h.cfg.LockPath) succeeds, h.st.Get("EXEC-1") returns an error and agent.calls is 0.
- **Run:** `cd backend/worker && go test ./internal/runner -run TestRunLockedKeepsForeignLock`
- **Expected:** Test passes

### Step 2 — `backend/worker/internal/runner/runner_lock_timeout_test.go` · `new: TestRunTimeoutPerAttempt` · new
- **Do:** Use fakeAgent{block:true} and Config{Timeout:20*time.Millisecond, MaxRetries:1}; call Run; assert errors.Is(err, context.DeadlineExceeded) and agent.calls == 2.
- **Run:** `cd backend/worker && go test ./internal/runner -run TestRunTimeoutPerAttempt`
- **Expected:** Test passes with two attempts

## Acceptance criteria
- Given the lock file exists, When Run is called, Then the lock file still exists and the store has no record
- Given a blocking agent, Timeout 20ms and MaxRetries 1, When Run is called, Then calls is 2 and error wraps context.DeadlineExceeded

## Definition of done
- Both tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-199.md`

## Links
- Evidence: EVD-040
- Requirement: REQ-098
- Unit (Act): UNIT-195
- Unit (Verify): UNIT-199
- Status: completed
- Change: UPDATE
