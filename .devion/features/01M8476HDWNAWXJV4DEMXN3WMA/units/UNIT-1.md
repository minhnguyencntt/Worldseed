---
id: "01M8476HDX8FQMYCQJ05DEP5S7"
kind: unit
parent: 01M8476HDWN1RYXFMM6X9SRQJ6
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Register admin round routes from an adminRoute table

Replace inline round registrations in server.New with a loop over a table so tests can reuse the same list.

## Acceptance criteria
- Round routes are registered via the table with unchanged paths and methods.
- adminRoutes returns the five round routes.


## Scope
- In scope: backend/internal/server/server.go
- Out of scope: Tests
- Preserve: Existing paths and handlers


## Technical constraints
- Same package server
- Code path: `backend/internal/server/server.go`


## Definition of done
- go build ./... passes
- Behavior unchanged


## Clarifying questions
- None
