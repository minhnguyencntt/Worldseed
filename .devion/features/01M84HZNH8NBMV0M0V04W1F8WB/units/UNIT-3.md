---
id: "01M84HZNH9WR18SDDC19WE2PMS"
kind: unit
parent: 01M84HZNH8Y4N1DJ9PKBDWM6JH
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Confirm no execution or worker config or dependency is used by the server package

Confirm server.go and rounds_adapter.go use only config sections Auth, Storage, Git, Contribution, Round and Admin so tests need only mocked Git and temp dirs.

## Acceptance criteria
- Server code reads no execution or worker config field
- Round service is built from cfg.Storage and cfg.Git only


## Scope
- In scope: backend/internal/server/server.go
- In scope: backend/internal/server/rounds_adapter.go
- Out of scope: backend/internal/config
- Preserve: newRoundService and NewScheduler


## Technical constraints
- Do not modify config package
- Code path: `backend/internal/server/server.go`
- Code path: `backend/internal/server/rounds_adapter.go`


## Definition of done
- No execution or worker config referenced


## Clarifying questions
- None
