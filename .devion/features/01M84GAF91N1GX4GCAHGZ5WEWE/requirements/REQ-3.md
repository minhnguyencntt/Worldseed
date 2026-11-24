---
id: "01M84GAF91VQQ0QA9WTEDYG9SV"
kind: requirement
parent: 01M84GAF91N1GX4GCAHGZ5WEWE
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · A held lock blocks Run and exceeded budget stops retries with ErrBudgetExceeded

Context: run acquires lock.Acquire before any state is written, and stops retrying once spent > MaxBudget. Desired: both are proven including that a held lock creates no worktree and no execution record, and that a budget stop persists FAILED and removes the worktree once. Why: protects the single-run-per-World guarantee and spend cap.

## Acceptance criteria
- Given the lock file exists, When Run is called, Then errors.Is(err, lock.ErrLocked), agent.calls is 0, no worktree is created and store.Get(EXEC-1) fails
- Given cost 3.0, MaxBudget 5.0, MaxRetries 5 and all calls fail, When Run is called, Then the error wraps ErrBudgetExceeded, agent.calls is 2, stored status is FAILED and trees.removed has one entry


## Scope
- In scope: Confirm lock acquisition order and budget condition in runner.go
- Out of scope: Lock package internals
- Preserve: Lock released via defer


## Definition of done
- Lock-before-save order and budget condition verified correct


## Clarifying questions
- None
