---
id: "01M8457KMNZEKD0H1DQSEXK0KS"
kind: requirement
parent: 01M8457KMMMN7NH1RGW812T7ZD
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Contribution endpoints and world routes are wired into the server with configuration

Context: server.go registers only session routes. Desired behavior: handlers for POST /api/v1/contributions, GET /api/v1/contributions/{id}, GET /api/v1/player/me/contributions identify the player from the session cookie, map service errors to HTTP statuses, and server.New wires all routes with storage and contribution limits from YAML config. Expected result: endpoints work end to end in-process. Why: expose the feature.

## Acceptance criteria
- Given no valid session cookie, when POST /api/v1/contributions runs, then 401 is returned
- Given a valid cookie and valid body {world_id, prompt}, when POST runs, then 201 with the contribution JSON is returned
- Given ErrPromptLength/ErrRoundNotOpen/ErrLimitReached/ErrRateLimited/ErrDuplicate, when POST runs, then the status is 400/409/429/429/409 respectively and ErrWorldNotFound gives 404
- Given a stored id, when GET /api/v1/contributions/{id} runs, then 200 is returned, and an unknown id gives 404
- Given a valid cookie, when GET /api/v1/player/me/contributions runs, then only that player's contributions are returned
- Given a YAML config with storage and contribution blocks, when loaded, then fields are parsed and defaults fill omitted limits


## Scope
- In scope: POST/GET contribution routes and player history are served; routes and config are wired.
- Out of scope: Admin APIs
- Out of scope: Frontend changes
- Out of scope: Git push
- Preserve: Existing player session handlers in backend/internal/player
- Preserve: GET /healthz


## Technical constraints
- Go 1.22, chi router, no database; persistent data lives in Git as Markdown/YAML
- Git writes go through an interface wrapping the Git CLI


## Definition of done
- Acceptance criteria met by implementation


## Clarifying questions
- None
