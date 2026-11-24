---
id: "01M8457KMNQV27GGDGKH8GE5YH"
kind: requirement
parent: 01M8457KMMMN7NH1RGW812T7ZD
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · World and current-round read endpoints serve data from the repository files

Context: world data lives in worlds/<id>/world.yaml and rounds/<round>/round.yaml, game content in game/content/worlds/<id>. Desired behavior: a world repository and handlers for the four read endpoints. Expected result: JSON responses, 404 for unknown worlds. Why: the client needs world, game and round state.

## Acceptance criteria
- Given worlds/the-boys-room/world.yaml, when GET /api/v1/worlds runs, then a JSON array containing that world id is returned
- Given an unknown or unsafe world id, when GET /api/v1/worlds/{id} runs, then 404 is returned
- Given round directories, when GET /api/v1/worlds/{id}/round/current runs, then the highest-numbered round with id, number, status, starts_at and ends_at is returned
- Given game content for the world, when GET /api/v1/worlds/{id}/game runs, then the world YAML and scenes are returned as JSON


## Scope
- In scope: GET /worlds, /worlds/{id}, /worlds/{id}/game and /worlds/{id}/round/current respond from files.
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
