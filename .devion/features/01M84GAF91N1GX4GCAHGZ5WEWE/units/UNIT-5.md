---
id: "01M84GAF927JWRTQH50AC806ZZ"
kind: unit
parent: 01M84GAF91YHBCPRJZQFKHDMBG
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: MaxRetries exhaustion removes the worktree once unit tests

Add a test with MaxRetries 2 and three failing calls asserting attempts, FAILED status and one worktree removal.

## Acceptance criteria
- agent.calls is 3 and stored status FAILED with last error text
- trees.removed has exactly one entry equal to WorkRoot/EXEC-1


## Scope
- In scope: backend/worker/internal/runner/runner_retry_cleanup_test.go
- Out of scope: Product code
- Preserve: Existing tests


## Technical constraints
- Reuse runner_test.go fakes


## Definition of done
- Test passes


## Clarifying questions
- None
