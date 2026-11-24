# UNIT-201 — Verify: Approval gate and worktree cleanup unit tests

## Summary
Fix TestRunCleanup and cover worktree create failure and failure cleanup

## Description
Correct the stale TestRunCleanup config and add tests with a failing Worktrees fake; Git is fully mocked.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/worker/internal/runner/runner_test.go` · `TestRunCleanup` · L132-L158
- **Do:** Change 'newRunner(t, Config{}, agent)' to 'newRunner(t, Config{AutoPublish: true}, agent)' and update the doc comment to say AutoPublish is true so the gate does not hold the worktree.

```
newRunner(t, Config{}, agent) -> newRunner(t, Config{AutoPublish: true}, agent)
```

- **Run:** `cd backend/worker && go test ./internal/runner -run '^TestRunCleanup$'`
- **Expected:** Test passes

### Step 2 — `backend/worker/internal/runner/runner_cleanup_test.go` · `new: TestRunCreateWorktreeError` · new
- **Do:** Define type createFailTrees embedding fakeTrees whose Create returns errors.New("no git"); set h.r.trees = &createFailTrees{}; call Run; assert error contains "no git", agent.calls == 0 and h.st.Get("EXEC-1").Status == store.StatusRunning.
- **Run:** `cd backend/worker && go test ./internal/runner -run TestRunCreateWorktreeError`
- **Expected:** Test passes

### Step 3 — `backend/worker/internal/runner/runner_cleanup_test.go` · `new: TestRunFailureRemovesWorktree` · new
- **Do:** fakeAgent{errs: one error}, Config{MaxRetries:0}; call Run; assert len(h.trees.removed) == 1 and len(h.pub.calls) == 0.
- **Run:** `cd backend/worker && go test ./internal/runner -run TestRunFailureRemovesWorktree`
- **Expected:** Test passes

## Acceptance criteria
- TestRunCleanup passes with AutoPublish true
- Create failure never runs the agent
- Agent failure removes worktree and skips publish

## Definition of done
- go test ./internal/runner -run 'TestRunCleanup|TestRunCreateWorktreeError|TestRunFailureRemovesWorktree' passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-201.md`

## Links
- Evidence: EVD-040
- Requirement: REQ-100
- Unit (Act): UNIT-197
- Unit (Verify): UNIT-201
- Status: completed
- Change: UPDATE
