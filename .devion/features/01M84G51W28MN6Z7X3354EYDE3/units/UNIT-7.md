---
id: "01M84G51W3PVWDAZ9A0EEXJKPC"
kind: unit
parent: 01M84G51W2645W556AHA7Q4GDA
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Approval gate and worktree cleanup unit tests

Correct the stale TestRunCleanup config and add tests with a failing Worktrees fake; Git is fully mocked.

## Acceptance criteria
- TestRunCleanup passes with AutoPublish true
- Create failure never runs the agent
- Agent failure removes worktree and skips publish


## Scope
- In scope: runner_test.go TestRunCleanup, runner_cleanup_test.go
- Out of scope: Product code
- Preserve: Gate tests


## Technical constraints
- Same package runner


## Definition of done
- go test ./internal/runner -run 'TestRunCleanup|TestRunCreateWorktreeError|TestRunFailureRemovesWorktree' passes


## Clarifying questions
- None
