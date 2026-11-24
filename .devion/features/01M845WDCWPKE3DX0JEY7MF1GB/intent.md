---
id: "01M845WDCWPKE3DX0JEY7MF1GB"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-4.2 · Serve the current round at /round/current

Context: backend/internal/server/server.go:46 registers GET /api/v1/worlds/{id}/rounds/current, but the spec path is /api/v1/worlds/{id}/round/current. Desired behavior: the server serves the current round at the spec path and a routing test uses that path. Expected result: the specified path returns the current round and the old plural path is no longer routed. Why: API consumers must match the documented contract.

## Acceptance criteria
- Given a world and a round on disk, when GET /api/v1/worlds/the-boys-room/round/current is requested, then the response is 200 with the round JSON
- Given the same data, when GET /api/v1/worlds/the-boys-room/rounds/current is requested, then the response is 404
- A routing test in the server package requests the specified path


## Scope
- In scope: Change the route path in backend/internal/server/server.go
- In scope: Add a routing test using the specified path
- Out of scope: Changing the CurrentRound handler or repository logic
- Out of scope: Other routes
- Preserve: world.Handler.CurrentRound behavior and 404 handling
- Preserve: All other registered routes


## Technical constraints
- Go with Chi router; no database


## Definition of done
- Route is /api/v1/worlds/{id}/round/current
- Server routing test passes


## Clarifying questions
- None
