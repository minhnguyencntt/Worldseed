# UNIT-186 — Verify: Runner lock, worktree and timeout unit tests

## Summary
Unit tests with fakes for lock, worktree and timeout

## Description
Write runner_test.go with fake Agent, Worktrees and Publisher plus a temp dir for lock and store, proving Act A1 against R1 criteria.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/worker/internal/runner/runner_test.go` · `new: fakeAgent, fakeTrees, fakePublisher, newRunner helper` · new
- **Do:** Create package runner test file. fakeAgent has fields cost float64, errs []error, block bool, calls int; Run increments calls, if block waits on <-ctx.Done() and returns ctx.Err(), else pops errs. fakeTrees records created, removed []string. fakePublisher records calls. newRunner(t, cfg, agent) builds Config with LockPath and WorkRoot under t.TempDir(), store.New(t.TempDir()), fixed now.
- **Run:** `cd backend/worker && go test ./internal/runner -run TestRunLocked`
- **Expected:** Helpers compile

### Step 2 — `backend/worker/internal/runner/runner_test.go` · `TestRunLocked` · new
- **Do:** Pre-create the file cfg.LockPath with os.WriteFile; call Run(ctx,"EXEC-1","ROUND-0000001"); assert errors.Is(err, lock.ErrLocked), agent.calls==0 and len(trees.created)==0.
- **Run:** `cd backend/worker && go test ./internal/runner -run TestRunLocked`
- **Expected:** Test passes

### Step 3 — `backend/worker/internal/runner/runner_test.go` · `TestRunCleanup` · new
- **Do:** AutoPublish irrelevant; agent succeeds; call Run; assert lock file path does not exist (os.Stat gives fs.ErrNotExist), trees.created equals trees.removed equal to filepath.Join(WorkRoot,"EXEC-1") and agent.workDir equals the same.
- **Run:** `cd backend/worker && go test ./internal/runner -run TestRunCleanup`
- **Expected:** Test passes

### Step 4 — `backend/worker/internal/runner/runner_test.go` · `TestRunTimeout` · new
- **Do:** agent.block=true, Timeout 20ms; call Run; assert errors.Is(err, context.DeadlineExceeded) and st.Get("EXEC-1").Status == store.StatusFailed.
- **Run:** `cd backend/worker && go test ./internal/runner -run TestRunTimeout`
- **Expected:** Test passes

## Acceptance criteria
- Locked, cleanup and timeout cases each have a passing test
- Tests use only fakes and t.TempDir

## Definition of done
- go test ./internal/runner -run 'TestRun(Locked|Cleanup|Timeout)' passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-186.md`

## Links
- Evidence: EVD-038
- Requirement: REQ-092
- Unit (Act): UNIT-183
- Unit (Verify): UNIT-186
- Status: completed
- Change: UPDATE
