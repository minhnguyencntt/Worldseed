---
id: "01M84FKWSF7E50GQCTKE2N6X4R"
kind: unit
parent: 01M84FKWSFVP25P49J374TWWMF
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add the approval gate before publishing

Edit runner.go success handling so AutoPublish false stops at AWAITING_APPROVAL with the worktree kept, and true calls Publisher.Publish then completes.

## Acceptance criteria
- AutoPublish false never calls Publish
- AutoPublish true publishes and completes


## Scope
- In scope: runner.go success branch
- Out of scope: Approve flow
- Preserve: failure handling


## Technical constraints
- Depends on Act: Create the runner package having been done
- New file: `backend/worker/internal/runner/runner.go`


## Dependencies
- R3


## Definition of done
- go build ./internal/runner passes


## Clarifying questions
- None
