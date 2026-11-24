---
id: "01M84GTRQR3R7X0YWQAWDNAMXK"
kind: unit
parent: 01M84GTRQQK8R24MTCWDEJ1FDF
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Wrap Git failures and guard a nil Closer in Poll

Finalize error semantics in Poller.Poll in poller.go.

## Acceptance criteria
- Pull and List errors return Result{} wrapped with %w.
- A nil Closer yields an error for an expired Round.


## Scope
- In scope: backend/worker/internal/poller/poller.go
- Out of scope: Retry
- Out of scope: Tests
- Preserve: Detection and closing behavior


## Technical constraints
- Use %w wrapping so errors.Is works
- New file: `backend/worker/internal/poller/poller.go`


## Definition of done
- poller.go builds with the error semantics


## Clarifying questions
- None
