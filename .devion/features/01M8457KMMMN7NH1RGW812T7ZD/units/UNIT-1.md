---
id: "01M8457KMNMPKHMBD6YY6RQWE2"
kind: unit
parent: 01M8457KMMSQBY9VJAQTVZ1RNJ
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Implement contribution service validation rules

Context: no contribution logic exists. Desired behavior: Service.Submit validates prompt length, world existence, OPEN round, per-player limit of 5, request rate and duplicate/spam prompts using an injected clock. Expected result: typed errors per rule. Why: protect the Git-backed record from abuse.

## Acceptance criteria
- Given a prompt shorter than MinPromptLen or longer than MaxPromptLen, when Submit runs, then ErrPromptLength is returned
- Given a world with no round source entry, when Submit runs, then ErrWorldNotFound is returned
- Given a round whose status is not OPEN, when Submit runs, then ErrRoundNotOpen is returned


## Scope
- In scope: The service rejects invalid submissions before anything is written.
- Out of scope: Writing tests
- Out of scope: Frontend changes
- Preserve: Existing player session handlers in backend/internal/player
- Preserve: GET /healthz


## Technical constraints
- Go 1.22, chi router, no database; persistent data lives in Git as Markdown/YAML
- Git writes go through an interface wrapping the Git CLI
- New file: `backend/internal/contribution/service.go`
- New file: `backend/internal/contribution/ratelimit.go`


## Definition of done
- Product code compiles with go build ./...


## Clarifying questions
- None
