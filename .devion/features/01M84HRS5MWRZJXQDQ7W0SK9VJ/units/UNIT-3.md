---
id: "01M84HRS5NNJK2JYVW089D9NQG"
kind: unit
parent: 01M84HRS5MQHFTDGXJG2YDETKM
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Remove execution wiring and routes from server.New

Edit backend/internal/server/server.go so it no longer references the execution package and mounts only round admin routes.

## Acceptance criteria
- Given server.go, when read, then it has no execution import, exStore, eh or /executions routes.
- Given New, when mounting admin routes, then it iterates adminRoundRoutes(rh).


## Scope
- In scope: backend/internal/server/server.go
- Out of scope: round admin handler behavior
- Preserve: gitCLI and contribution store wiring
- Preserve: NewScheduler


## Technical constraints
- gitCLI is still used by contribution.FileStore, so keep it
- Code path: `backend/internal/server/server.go`


## Definition of done
- server.go compiles without internal/execution


## Clarifying questions
- None
