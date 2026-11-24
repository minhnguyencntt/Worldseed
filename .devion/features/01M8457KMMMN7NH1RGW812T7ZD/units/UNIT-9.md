---
id: "01M8457KMNF1HNYC34Y3MTM515"
kind: unit
parent: 01M8457KMNQV27GGDGKH8GE5YH
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: World repository and read handler unit tests

Unit tests written from the requirement spec with temp-dir files and httptest only. Context: GET /worlds, /worlds/{id}, /worlds/{id}/game and /worlds/{id}/round/current respond from files. Expected result: all listed tests pass.

## Acceptance criteria
- Given worlds/the-boys-room/world.yaml, when GET /api/v1/worlds runs, then a JSON array containing that world id is returned
- Given an unknown or unsafe world id, when GET /api/v1/worlds/{id} runs, then 404 is returned
- Given round directories, when GET /api/v1/worlds/{id}/round/current runs, then the highest-numbered round with id, number, status, starts_at and ends_at is returned
- Given game content for the world, when GET /api/v1/worlds/{id}/game runs, then the world YAML and scenes are returned as JSON


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
