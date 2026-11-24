---
id: "01M8457KMNBJJM1XTK538W1B9M"
kind: unit
parent: 01M8457KMNQV27GGDGKH8GE5YH
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Implement the world repository and read handlers

Context: world data lives in worlds/<id>/world.yaml and rounds/<round>/round.yaml, game content in game/content/worlds/<id>. Desired behavior: a world repository and handlers for the four read endpoints. Expected result: JSON responses, 404 for unknown worlds. Why: the client needs world, game and round state.

## Acceptance criteria
- Given worlds/the-boys-room/world.yaml, when GET /api/v1/worlds runs, then a JSON array containing that world id is returned
- Given an unknown or unsafe world id, when GET /api/v1/worlds/{id} runs, then 404 is returned
- Given round directories, when GET /api/v1/worlds/{id}/round/current runs, then the highest-numbered round with id, number, status, starts_at and ends_at is returned


## Scope
- In scope: GET /worlds, /worlds/{id}, /worlds/{id}/game and /worlds/{id}/round/current respond from files.
- Out of scope: Writing tests
- Out of scope: Frontend changes
- Preserve: Existing player session handlers in backend/internal/player
- Preserve: GET /healthz


## Technical constraints
- Go 1.22, chi router, no database; persistent data lives in Git as Markdown/YAML
- Git writes go through an interface wrapping the Git CLI
- New file: `backend/internal/world/world.go`
- New file: `backend/internal/world/handler.go`


## Definition of done
- Product code compiles with go build ./...


## Clarifying questions
- None
