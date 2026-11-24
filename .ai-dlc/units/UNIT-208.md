# UNIT-208 — Verify: Held lock and budget stop unit tests

## Summary
Unit tests for lock-held no-side-effects and budget-stop persistence

## Description
Add two tests: a held lock leaves no execution record or worktree; a budget stop persists FAILED, wraps ErrBudgetExceeded and removes the worktree once.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/worker/internal/runner/runner_lock_budget_test.go` · `new: TestRunLockedLeavesNoRecord` · new
- **Do:** Build newRunner(t, Config{}, &fakeAgent{}); create the lock dir and write the file h.cfg.LockPath as in TestRunLocked; call Run; assert errors.Is(err, lock.ErrLocked), agent.calls == 0, len(h.trees.created) == 0, and h.st.Get("EXEC-1") returns a non-nil error.
- **Run:** `cd backend/worker && go test ./internal/runner -run TestRunLockedLeavesNoRecord`
- **Expected:** Test passes

### Step 2 — `backend/worker/internal/runner/runner_lock_budget_test.go` · `new: TestRunBudgetExceededPersistsFailed` · new
- **Do:** Use fakeAgent{cost: 3.0, errs: six errors} and Config{MaxRetries: 5, MaxBudget: 5.0, Timeout: 5 * time.Second}; call Run; assert errors.Is(err, ErrBudgetExceeded), agent.calls == 2, stored Status == store.StatusFailed, stored Error contains "budget exceeded" and len(h.trees.removed) == 1.
- **Run:** `cd backend/worker && go test ./internal/runner -run TestRunBudgetExceededPersistsFailed`
- **Expected:** Test passes

## Acceptance criteria
- Held lock: ErrLocked, zero agent calls, no worktree, store.Get returns an error
- Budget stop: ErrBudgetExceeded, 2 calls, stored FAILED, one worktree removal

## Definition of done
- Both tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-208.md`

## Links
- Evidence: EVD-041
- Requirement: REQ-104
- Unit (Act): UNIT-205
- Unit (Verify): UNIT-208
- Status: completed
- Change: UPDATE
