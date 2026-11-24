---
id: "01M84HZNH8NBMV0M0V04W1F8WB"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-2 · Remove execution, approve and retry routes from the server

Context: Worldseed must not host development automation. The execution package and the worker module are already deleted, and server.New currently mounts only player, world, contribution and admin round routes. Desired behavior: the server package neither registers nor implements execution, approve or retry routes, and wires no execution or worker dependencies. Expected result: remaining server tests pass with all dependencies mocked, and the contribution and round routes are unchanged. Why: development automation lives in the devion project workseed.

## Acceptance criteria
- Given server.New, when /api/v1/admin/executions, /api/v1/admin/executions/{id}/approve and /retry are requested with a valid admin token, then the response is 404 or 405 and no execution handler runs
- Given the backend/internal/server package, when its Go sources are scanned, then none references internal/execution, storyforge/worker, or an execution handler
- Given the remaining server tests run with mocks, when go test ./internal/server runs, then all pass
- Given the contribution and round routes, when requested, then their statuses and bodies are identical to before


## Scope
- In scope: backend/internal/server/server.go
- In scope: backend/internal/server/server_test.go
- In scope: backend/internal/server/removed_code_test.go
- Out of scope: backend/internal/contribution behavior
- Out of scope: round lifecycle behavior
- Out of scope: game/ and frontend
- Preserve: POST /api/v1/contributions
- Preserve: GET /api/v1/player/me/contributions
- Preserve: GET /api/v1/contributions/{id}
- Preserve: admin round routes and token middleware
- Preserve: round/current route


## Technical constraints
- Go module backend; chi router; do not change contribution or round route patterns


## Definition of done
- No execution, approve or retry route or wiring in backend/internal/server
- go test ./internal/server passes


## Clarifying questions
- None
