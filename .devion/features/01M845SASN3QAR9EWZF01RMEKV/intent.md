---
id: "01M845SASN3QAR9EWZF01RMEKV"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-4.1 · Serve player contribution history at /api/v1/player/me/contributions

Context: backend/internal/server/server.go registers ch.Mine at GET /api/v1/contributions/mine. Desired behavior: the same handler is served at GET /api/v1/player/me/contributions. Expected result: the new path returns the caller history and the old path no longer routes to Mine. Why: the player API surface groups player-scoped data under /player/me.

## Acceptance criteria
- Given a valid session cookie and round_id, when GET /api/v1/player/me/contributions is requested, then the response is 200 with a JSON array
- Given a valid session cookie, when GET /api/v1/contributions/mine is requested, then it no longer reaches Mine and responds 404
- Given no session cookie, when GET /api/v1/player/me/contributions is requested, then the response is 401


## Scope
- In scope: Route registration in server.New
- In scope: Unit test for the new path in server_test.go
- Out of scope: Changing contribution.Handler.Mine behavior
- Out of scope: Frontend changes
- Preserve: POST /api/v1/contributions
- Preserve: GET /api/v1/contributions/{id}
- Preserve: GET /api/v1/player/me


## Technical constraints
- Go chi router; reuse existing Handler.Mine


## Definition of done
- New path served and old Mine route removed
- Unit tests pass


## Clarifying questions
- None
