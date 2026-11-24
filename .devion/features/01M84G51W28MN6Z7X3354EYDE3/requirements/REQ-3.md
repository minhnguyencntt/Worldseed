---
id: "01M84G51W2645W556AHA7Q4GDA"
kind: requirement
parent: 01M84G51W28MN6Z7X3354EYDE3
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Approval gate and worktree cleanup tests are correct and green

Context: with AutoPublish false run returns AWAITING_APPROVAL and keeps the worktree, so TestRunCleanup (Config{}) fails expecting a removal. Desired behavior: the cleanup test sets AutoPublish true; failure of Worktrees.Create stops the run before the agent; an agent failure removes the worktree without publishing. Why: the suite must be green and cover the gate and cleanup.

## Acceptance criteria
- Given AutoPublish true and a succeeding agent, When Run is called, Then the worktree is created and removed once and the lock file is gone
- Given Worktrees.Create fails, When Run is called, Then the error wraps it, the agent never ran and the stored status is RUNNING
- Given the agent fails, When Run is called, Then the worktree is removed once and the publisher is not called


## Scope
- In scope: Gate and cleanup tests
- Out of scope: Changing gate semantics
- Preserve: Gate tests in runner_gate_test.go


## Technical constraints
- Gate behavior in runner.go stays as is


## Definition of done
- go test ./internal/runner passes including TestRunCleanup


## Clarifying questions
- None
