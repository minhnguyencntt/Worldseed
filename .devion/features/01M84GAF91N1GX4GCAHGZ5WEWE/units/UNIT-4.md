---
id: "01M84GAF920NPK8B6GMWTR3AX4"
kind: unit
parent: 01M84GAF91Y0QK308WA23FXPDX
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Timed-out attempt is retried once and fails with ErrTimeout unit tests

Add tests using fakeAgent{block:true} and a 20ms Timeout, plus a cancelled-parent case.

## Acceptance criteria
- Timeout with MaxRetries 1 runs agent twice and wraps ErrTimeout and DeadlineExceeded
- Cancelled parent context does not wrap ErrTimeout


## Scope
- In scope: backend/worker/internal/runner/runner_timeout_retry_test.go
- Out of scope: Product code
- Preserve: Existing tests


## Technical constraints
- Reuse newRunner, fakeAgent, fakeTrees from runner_test.go


## Definition of done
- Both tests pass


## Clarifying questions
- None
