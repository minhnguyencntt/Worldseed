---
id: "01M84660BFJBRJ2JTK2DQXKA0W"
kind: unit
parent: 01M84660BE081E4HSVB040CJ4S
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Implement execution store, handlers and routes

Add execution.go, handler.go and wire into the admin route group.

## Acceptance criteria
- Illegal state returns ErrIllegalState mapped to 409
- Updated record is committed through the Committer


## Scope
- In scope: backend/internal/execution/execution.go
- In scope: backend/internal/execution/handler.go
- In scope: backend/internal/server/server.go
- Out of scope: Worker
- Preserve: Round routes


## Technical constraints
- Path development/executions/<id>.yaml
- New file: `backend/internal/execution/execution.go`
- New file: `backend/internal/execution/handler.go`
- Code path: `backend/internal/server/server.go`


## Dependencies
- R6
- A4
- A5


## Definition of done
- go build ./...


## Clarifying questions
- None
