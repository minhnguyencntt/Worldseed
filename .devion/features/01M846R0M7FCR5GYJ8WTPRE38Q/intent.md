---
id: "01M846R0M7FCR5GYJ8WTPRE38Q"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-5.1 · One owner for round types, admin routes agree with them

Context: backend/internal/round/round.go is now the only declaration of Status, Round and CanTransition, and go build ./... passes. But internal/admin.RoundService speaks world.Round while round.Service speaks round.Round, and server.New never mounts the admin round routes, so TestNew_AdminRoundsAreMounted fails with 404. Desired: the round, lifecycle and scheduler files agree on the same types and the backend serves them. Why: SG-5 lifecycle must be reachable.

## Acceptance criteria
- Given the backend tree, when go build ./... and go vet ./... run, then both succeed with Status, Round and CanTransition declared only in internal/round/round.go
- Given server.New with admin.token tok, when each admin round endpoint is called with Bearer tok, then the response is not 404
- Given a round.Service error, when an admin round handler maps it, then ErrNotFound gives 404 and ErrIllegalTransition or ErrActiveRound gives 409


## Scope
- In scope: adapter from round.Service to admin.RoundService
- In scope: mount admin round routes in server.New
- In scope: start round.Scheduler
- Out of scope: frontend
- Out of scope: worker
- Out of scope: new round states
- Preserve: round.Round and Transitions table
- Preserve: existing execution admin routes
- Preserve: admin.Middleware token auth


## Technical constraints
- Go, chi, no database
- round package remains sole owner of Status, Round, CanTransition


## Definition of done
- go build ./... and go test ./internal/server ./internal/round ./internal/admin pass


## Clarifying questions
- None
