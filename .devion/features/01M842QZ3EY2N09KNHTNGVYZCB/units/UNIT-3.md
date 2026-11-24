---
id: "01M842QZ3FZX17KV950M11H86B"
kind: unit
parent: 01M842QZ3FFD12VY1QT4VGDQY7
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Implement player me endpoint

Add Me handler to player.Handler verifying cookie and register route.

## Acceptance criteria
- Given a valid session cookie, when GET /api/v1/player/me, then 200 is returned
- Given a missing or invalid cookie, when requested, then 401 is returned


## Scope
- In scope: Me handler
- In scope: route
- Preserve: session endpoint


## Technical constraints
- injected clock
- New file: `backend/internal/player/handler.go`
- New file: `backend/internal/server/server.go`


## Dependencies
- A2


## Definition of done
- Build succeeds


## Clarifying questions
- None
