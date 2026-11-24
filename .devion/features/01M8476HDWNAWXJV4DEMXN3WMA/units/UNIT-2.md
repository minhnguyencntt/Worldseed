---
id: "01M8476HDXCETCEQ3TX7C531E0"
kind: unit
parent: 01M8476HDXDHJR0X9BXE4PVW8F
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Register admin execution routes from the same table

Move execution registrations into the table and expose one adminRoutes(eh, rh) that tests can call.

## Acceptance criteria
- adminRoutes returns eight routes: five round and three execution.
- Execution routes keep their paths and methods.


## Scope
- In scope: backend/internal/server/server.go
- Out of scope: Tests
- Out of scope: execution.Handler
- Preserve: Paths and handlers


## Technical constraints
- Depends on ACT1 table
- Code path: `backend/internal/server/server.go`


## Dependencies
- ACT1


## Definition of done
- go build ./... passes


## Clarifying questions
- None
