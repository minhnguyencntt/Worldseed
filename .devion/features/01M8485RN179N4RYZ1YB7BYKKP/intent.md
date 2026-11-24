---
id: "01M8485RN179N4RYZ1YB7BYKKP"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-6.1 · Add a listExecutions admin client function

Context: game/frontend/src/api/client.ts already has adminRequest, getCurrentRound, approveExecution, retryExecution and the ExecutionInfo type, but nothing calls GET /api/v1/admin/executions. Desired behavior: add listExecutions and a current-Round ExecutionInfo lookup, covered by a unit test with mocked fetch. Why: the admin console needs execution data to show Round progress.

## Acceptance criteria
- Given an admin token, when listExecutions is called, then GET /api/v1/admin/executions is requested with a Bearer Authorization header and the parsed ExecutionInfo array is returned
- Given executions for several rounds, when the current-Round lookup runs, then the ExecutionInfo whose round_id equals the current Round id is returned, or undefined when none matches
- Given a mocked fetch, when the unit tests run, then they pass without any network access


## Scope
- In scope: listExecutions in client.ts
- In scope: current-Round ExecutionInfo lookup in client.ts
- In scope: unit test with mocked fetch
- Out of scope: Backend changes
- Out of scope: AdminApp UI wiring
- Out of scope: New endpoints
- Preserve: Existing client.ts exports and behavior
- Preserve: ApiError handling in readJSON


## Technical constraints
- Reuse adminRequest and ExecutionInfo
- Endpoint is GET /api/v1/admin/executions (backend/internal/server/server.go)


## Definition of done
- Both functions exported from client.ts
- Unit tests pass


## Clarifying questions
- None
