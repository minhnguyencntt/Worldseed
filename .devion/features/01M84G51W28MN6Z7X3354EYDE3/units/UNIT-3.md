---
id: "01M84G51W2S3BQBWEPT728C3K7"
kind: unit
parent: 01M84G51W2645W556AHA7Q4GDA
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Confirm approval gate and worktree cleanup paths in Runner

Read run and confirm AutoPublish false saves AWAITING_APPROVAL without Remove, and failure, publish error and completion paths call Worktrees.Remove. No product change is expected; the failing TestRunCleanup is a stale test expectation.

## Acceptance criteria
- Given runner.go, When read, Then AutoPublish false returns without calling trees.Remove
- Given runner.go, When read, Then agent failure, publish failure and completion each call trees.Remove


## Scope
- In scope: runner.go gate and cleanup
- Out of scope: Tests
- Preserve: Gate semantics


## Technical constraints
- Code path: `backend/worker/internal/runner/runner.go`


## Definition of done
- Code confirmed; go build succeeds


## Clarifying questions
- None
