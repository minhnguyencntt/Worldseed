---
id: "01M84GAF922Y78FRJSRRJTVZ5Q"
kind: unit
parent: 01M84GAF91VQQ0QA9WTEDYG9SV
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Held lock and budget stop unit tests

Add two tests: a held lock leaves no execution record or worktree; a budget stop persists FAILED, wraps ErrBudgetExceeded and removes the worktree once.

## Acceptance criteria
- Held lock: ErrLocked, zero agent calls, no worktree, store.Get returns an error
- Budget stop: ErrBudgetExceeded, 2 calls, stored FAILED, one worktree removal


## Scope
- In scope: backend/worker/internal/runner/runner_lock_budget_test.go
- Out of scope: Product code
- Preserve: Existing tests


## Technical constraints
- Reuse runner_test.go fakes


## Definition of done
- Both tests pass


## Clarifying questions
- None
