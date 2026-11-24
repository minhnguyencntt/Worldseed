---
id: "01M8457KMMMN7NH1RGW812T7ZD"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-4 · Add Git-backed contribution storage and API

Context: backend has only player sessions and /healthz. Desired behavior: a contribution service validates and stores each idea as an immutable Markdown file in Git under worlds/the-boys-room/rounds/<round>/contributions/, exposed through world and contribution endpoints. Expected result: players submit ideas safely and concurrently. Why: Git is the single source of truth.

## Acceptance criteria
- Given an OPEN round, when a valid prompt is POSTed, then a unique Markdown file is written and committed with the bot identity
- Given invalid input (length, world, status, limit, rate, duplicate), when submitted, then the request is rejected with a 4xx status and no file is written
- Given concurrent submissions, when they run together, then each produces a distinct file
- Given a traversal path segment, when used, then it is rejected
- All seven listed endpoints respond from the service/world repository


## Scope
- In scope: backend/internal contribution service, git wrapper, world repository, handlers, wiring
- Out of scope: Admin APIs
- Out of scope: Round lifecycle transitions
- Out of scope: Git push to a remote
- Out of scope: Frontend changes
- Preserve: Existing player session handlers in backend/internal/player
- Preserve: GET /healthz


## Technical constraints
- Go 1.22, chi router, no database; persistent data lives in Git as Markdown/YAML
- Git writes go through an interface wrapping the Git CLI


## Definition of done
- All listed endpoints wired
- Unit tests with mocked Git and clock pass


## Clarifying questions
- None
