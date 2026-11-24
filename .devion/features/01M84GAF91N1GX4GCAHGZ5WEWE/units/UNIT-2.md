---
id: "01M84GAF918PB05VJE7944AM4P"
kind: unit
parent: 01M84GAF91YHBCPRJZQFKHDMBG
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Confirm retry loop and failure cleanup in Runner.run

Read the retry loop and failure branch in Runner.run; they already break when attempt > MaxRetries and call trees.Remove once. Make no change unless a defect is found.

## Acceptance criteria
- Loop breaks when attempt > cfg.MaxRetries
- Failure branch saves FAILED with Error text then calls trees.Remove exactly once


## Scope
- In scope: backend/worker/internal/runner/runner.go review
- Out of scope: Behavior changes
- Preserve: Existing control flow


## Technical constraints
- Code path: `backend/worker/internal/runner/runner.go`


## Definition of done
- Loop and failure branch confirmed correct by reading


## Clarifying questions
- None
