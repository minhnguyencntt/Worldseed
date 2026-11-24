---
id: "01M847388WJ4VH6223RFTWAZQY"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-5.3 · Round service wired into admin routes and scheduler

Context: backend/internal/server/server.go already builds round.Service (newRoundService), adapts it with roundAdmin and roundDefaults, and mounts the five admin round routes under admin.Middleware. cmd/server/main.go already runs server.NewScheduler(cfg).Run(ctx). Desired behavior: this wiring is confirmed against the code and covered by passing route tests. Expected result: go test ./internal/server passes. Why: sub-goal SG-5.3 must be met without duplicating work that exists.

## Acceptance criteria
- Given a token-less request, when any admin round route is called, then the response is 401
- Given Bearer token and an existing round, when each admin round route is called, then the response is not 404
- Given main starts, when the server runs, then the scheduler Run loop is started on the shared context


## Scope
- In scope: backend/internal/server/server.go wiring
- In scope: backend/cmd/server/main.go scheduler start
- Out of scope: Changing round lifecycle logic
- Out of scope: Frontend or worker changes
- Preserve: Existing admin handler contracts
- Preserve: Git-backed storage, no database


## Technical constraints
- Go with chi router
- No database


## Definition of done
- Admin round routes mounted behind token middleware
- Scheduler started in main
- Route tests pass


## Clarifying questions
- None
