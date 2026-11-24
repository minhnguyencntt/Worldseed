---
id: "01M842QZ3EY2N09KNHTNGVYZCB"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-1 · Bootstrap Go backend with player sessions

Context: backend/ currently holds only README.md; there is no go.mod or Go source. Desired behavior: a Go module with Chi router, YAML config loader with env overrides, slog logging, GET health endpoint, POST /api/v1/player/session creating an anonymous player with a Secure HttpOnly cookie token, and GET /api/v1/player/me returning the player or 401. Expected result: all of it covered by httptest unit tests that run offline. Why: this is the foundation for later contribution and admin APIs, with no database or external store.

## Acceptance criteria
- Given the backend module, when `go test ./...` runs in backend/ with no network, then all tests pass
- Given a valid config YAML, when it is loaded, then env vars override secrets and Git/hosting settings
- Given POST /api/v1/player/session, when called, then a random player ID is returned and a Secure HttpOnly cookie is set
- Given GET /api/v1/player/me, when the cookie is valid it returns 200 with the player, otherwise 401


## Scope
- In scope: backend/ Go module
- In scope: configs example YAML
- In scope: slog logging
- In scope: health endpoint
- In scope: player session and me endpoints
- Out of scope: database or external store
- Out of scope: contribution, world, admin APIs
- Out of scope: frontend, game, worker
- Preserve: backend/README.md


## Technical constraints
- Go with Chi router
- HMAC secret from config verifies tokens
- No database or external store
- Tests must not use the network


## Definition of done
- All requirements delivered and unit tests pass offline


## Non-functional requirements
- Secrets never logged


## Clarifying questions
- None
