---
id: "01M84660BFZZCCTMR3QBF2JB67"
kind: unit
parent: 01M84660BEZPC2XDFBY1T7XRA5
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add admin round handlers, route wiring and scheduler start

Handler maps service errors to HTTP statuses; server builds the shared Service and routes.

## Acceptance criteria
- ErrNotFound->404, ErrIllegalTransition and ErrActiveRound->409, bad JSON->400
- roundSource.Current uses the round FileStore latest round


## Scope
- In scope: backend/internal/admin/rounds.go
- In scope: backend/internal/server/server.go
- In scope: backend/cmd/server/main.go
- Out of scope: executions
- Preserve: New(cfg,log) signature


## Technical constraints
- Handler depends on RoundService and ContributionLister interfaces
- New file: `backend/internal/admin/rounds.go`
- Code path: `backend/internal/server/server.go`
- Code path: `backend/cmd/server/main.go`


## Dependencies
- R5
- A2
- A3
- A4


## Definition of done
- go build ./...


## Clarifying questions
- None
