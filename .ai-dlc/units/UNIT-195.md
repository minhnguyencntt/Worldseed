# UNIT-195 — Act: Confirm lock and per-attempt timeout behavior in Runner

## Summary
Confirm Run acquires the lock before any side effect and runAttempt applies Timeout per attempt

## Description
Read runner.go and confirm lock.Acquire is the first action in run and that runAttempt creates a fresh context.WithTimeout for each call. No product change is expected unless a deviation is found.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/worker/internal/runner/runner.go` · `Runner.run` · L124-L141
- **Do:** Confirm lock.Acquire(r.cfg.LockPath) runs before r.st.Save and r.trees.Create and returns store.Execution{} wrapped with lock.ErrLocked on failure; change nothing if so.
- **Run:** `cd backend/worker && go build ./internal/runner`
- **Expected:** Build succeeds; ordering confirmed

### Step 2 — `backend/worker/internal/runner/runner.go` · `Runner.runAttempt` · L214-L219
- **Do:** Confirm runAttempt calls context.WithTimeout(ctx, r.cfg.Timeout) on every call and defers cancel; change nothing if so.
- **Run:** `cd backend/worker && go vet ./internal/runner`
- **Expected:** Vet passes; timeout per attempt confirmed

## Acceptance criteria
- Given runner.go, When read, Then lock.Acquire precedes store.Save and Worktrees.Create
- Given runner.go, When read, Then runAttempt creates a new timeout context per attempt

## Definition of done
- Code confirmed or minimally corrected; go build ./internal/runner succeeds
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-195.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-040
- Requirement: REQ-098
- Unit (Act): UNIT-195
- Unit (Verify): UNIT-199
- Status: completed
- Change: UPDATE
