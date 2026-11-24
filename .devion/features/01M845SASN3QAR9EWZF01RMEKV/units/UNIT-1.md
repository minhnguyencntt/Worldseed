---
id: "01M845SASNWN3HS2ZM2NV2XY3H"
kind: unit
parent: 01M845SASNGXM84XREXWYYCQXK
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Move the Mine route to /api/v1/player/me/contributions

In backend/internal/server/server.go replace the legacy Mine registration with the new path so the player history is served at /api/v1/player/me/contributions.

## Acceptance criteria
- Given server.New, when routes are registered, then GET /api/v1/player/me/contributions maps to ch.Mine
- Given server.New, when routes are registered, then /api/v1/contributions/mine is not registered


## Scope
- In scope: server.go
- Out of scope: handler.go
- Preserve: Create and Get routes


## Technical constraints
- Code path: `backend/internal/server/server.go`


## Definition of done
- server.go registers the new path only


## Clarifying questions
- None
