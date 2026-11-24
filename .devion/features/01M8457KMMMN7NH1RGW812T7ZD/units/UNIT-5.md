---
id: "01M8457KMNMG7R836YVYDX5S2D"
kind: unit
parent: 01M8457KMNZEKD0H1DQSEXK0KS
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add contribution handlers, config and route wiring

Context: server.go registers only session routes. Desired behavior: handlers for POST /api/v1/contributions, GET /api/v1/contributions/{id}, GET /api/v1/player/me/contributions identify the player from the session cookie, map service errors to HTTP statuses, and server.New wires all routes with storage and contribution limits from YAML config. Expected result: endpoints work end to end in-process. Why: expose the feature.

## Acceptance criteria
- Given no valid session cookie, when POST /api/v1/contributions runs, then 401 is returned
- Given a valid cookie and valid body {world_id, prompt}, when POST runs, then 201 with the contribution JSON is returned
- Given ErrPromptLength/ErrRoundNotOpen/ErrLimitReached/ErrRateLimited/ErrDuplicate, when POST runs, then the status is 400/409/429/429/409 respectively and ErrWorldNotFound gives 404


## Scope
- In scope: POST/GET contribution routes and player history are served; routes and config are wired.
- Out of scope: Writing tests
- Out of scope: Frontend changes
- Preserve: Existing player session handlers in backend/internal/player
- Preserve: GET /healthz


## Technical constraints
- Go 1.22, chi router, no database; persistent data lives in Git as Markdown/YAML
- Git writes go through an interface wrapping the Git CLI
- New file: `backend/internal/contribution/handler.go`
- Code path: `backend/internal/config/config.go`
- Code path: `backend/internal/server/server.go`
- Code path: `backend/configs/config.example.yaml`


## Definition of done
- Product code compiles with go build ./...


## Clarifying questions
- None
