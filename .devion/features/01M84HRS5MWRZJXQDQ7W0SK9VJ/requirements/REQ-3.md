---
id: "01M84HRS5MQHFTDGXJG2YDETKM"
kind: requirement
parent: 01M84HRS5MWRZJXQDQ7W0SK9VJ
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Server serves only round admin routes and the backend compiles without execution code

Context: backend/internal/server/server.go imports internal/execution, builds exStore and eh, and adminRoutes returns /executions, /executions/{id}/retry and /executions/{id}/approve before the round routes. Desired behavior: those imports, variables and routes are removed and New mounts adminRoundRoutes(rh) behind admin.Middleware. Expected result: remaining packages compile and tests pass. Why: nothing may import removed code.

## Acceptance criteria
- Given server.New, when the router is walked, then /api/v1/admin serves exactly the five round routes and no /executions route.
- Given any Go file under backend/, when imports are read, then none import internal/execution.
- Given go build ./... and go test for server, then both succeed.


## Scope
- In scope: backend/internal/server/server.go
- In scope: backend/internal/server/server_test.go
- Out of scope: Frontend admin client
- Preserve: Round admin routes and token middleware
- Preserve: contribution and world routes
- Preserve: NewScheduler


## Technical constraints
- Admin routes stay behind admin.Middleware(cfg.Admin.Token)


## Definition of done
- Server builds and its tests pass


## Clarifying questions
- None
