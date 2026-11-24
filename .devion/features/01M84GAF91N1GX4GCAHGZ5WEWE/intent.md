---
id: "01M84GAF91N1GX4GCAHGZ5WEWE"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-7.6 · Runner locking, timeout, retry, budget and approval gate unit tests

Context: backend/worker/internal/runner/runner.go already implements the per-World lock, per-attempt timeout, retry loop, ErrBudgetExceeded and worktree cleanup, and many tests exist. Gaps: no exported ErrTimeout exists (a timeout surfaces only as context.DeadlineExceeded), and nothing proves a timed-out agent is retried once and then FAILED. Desired behavior: Run returns an error wrapping ErrTimeout when an attempt times out, and unit tests prove lock-held, timeout retry, MaxRetries exhaustion with single worktree removal, and budget stop. Why: the worker must fail predictably and never leave stray worktrees.

## Acceptance criteria
- Given the lock file is already held, When Run is called, Then the error wraps lock.ErrLocked, the agent never runs and no worktree is created
- Given the agent blocks past Timeout and MaxRetries is 1, When Run is called, Then the agent runs twice, the stored status is FAILED and the error wraps ErrTimeout
- Given every attempt fails and MaxRetries is 2, When Run is called, Then the agent runs 3 times, the stored status is FAILED and the worktree is removed exactly once
- Given each failed attempt costs 3.0, MaxBudget is 5.0 and MaxRetries is 5, When Run is called, Then the error wraps ErrBudgetExceeded after 2 agent runs and the stored status is FAILED


## Scope
- In scope: backend/worker/internal/runner/runner.go ErrTimeout sentinel
- In scope: Runner unit tests with fake agent, worktrees, publisher, store in temp dir and fixed clock
- Out of scope: Real Git worktrees or real Claude CLI
- Out of scope: Approval gate behavior changes
- Out of scope: Other worker packages
- Preserve: Existing errors.Is(err, context.DeadlineExceeded) behavior
- Preserve: Existing runner tests stay green
- Preserve: Budget check semantics (zero or negative budget unlimited)


## Technical constraints
- Go tests only, no network, no real processes
- Use existing fakes in runner_test.go (fakeAgent, fakeTrees, newRunner)


## Definition of done
- All four acceptance criteria are asserted by passing unit tests
- go test ./internal/runner passes


## Non-functional requirements
- Tests finish in under a second using a 20ms timeout


## Clarifying questions
- None
