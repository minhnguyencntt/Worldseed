---
id: "01M84G51W2TEM1JDTH4JNBF0SR"
kind: unit
parent: 01M84G51W24BAPC1XEW2ZNS6ZD
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Confirm lock and per-attempt timeout behavior in Runner

Read runner.go and confirm lock.Acquire is the first action in run and that runAttempt creates a fresh context.WithTimeout for each call. No product change is expected unless a deviation is found.

## Acceptance criteria
- Given runner.go, When read, Then lock.Acquire precedes store.Save and Worktrees.Create
- Given runner.go, When read, Then runAttempt creates a new timeout context per attempt


## Scope
- In scope: runner.go run and runAttempt
- Out of scope: Tests
- Preserve: Public API


## Technical constraints
- Code path: `backend/worker/internal/runner/runner.go`


## Definition of done
- Code confirmed or minimally corrected; go build ./internal/runner succeeds


## Clarifying questions
- None
