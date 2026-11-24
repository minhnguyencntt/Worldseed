---
id: "01M8457KMN70JQF1SHGSRA9732"
kind: unit
parent: 01M8457KMNZEKD0H1DQSEXK0KS
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Contribution handlers, config and routing unit tests

Unit tests written from the requirement spec with fakes, fixed clock and httptest only. Context: POST/GET contribution routes and player history are served; routes and config are wired. Expected result: all listed tests pass.

## Acceptance criteria
- Given no valid session cookie, when POST /api/v1/contributions runs, then 401 is returned
- Given a valid cookie and valid body {world_id, prompt}, when POST runs, then 201 with the contribution JSON is returned
- Given ErrPromptLength/ErrRoundNotOpen/ErrLimitReached/ErrRateLimited/ErrDuplicate, when POST runs, then the status is 400/409/429/429/409 respectively and ErrWorldNotFound gives 404
- Given a stored id, when GET /api/v1/contributions/{id} runs, then 200 is returned, and an unknown id gives 404
- Given a valid cookie, when GET /api/v1/player/me/contributions runs, then only that player's contributions are returned
- Given a YAML config with storage and contribution blocks, when loaded, then fields are parsed and defaults fill omitted limits


## Scope
- In scope: Unit tests with fakes
- Out of scope: Running the server
- Out of scope: Browser or e2e checks
- Preserve: Existing player session handlers in backend/internal/player
- Preserve: GET /healthz


## Technical constraints
- Go 1.22, chi router, no database; persistent data lives in Git as Markdown/YAML
- Git writes go through an interface wrapping the Git CLI


## Definition of done
- Listed tests pass via the unit command


## Clarifying questions
- None
