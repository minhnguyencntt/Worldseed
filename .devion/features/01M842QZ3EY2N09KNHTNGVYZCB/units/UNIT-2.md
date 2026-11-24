---
id: "01M842QZ3FSDXHM9HWM7WM2CVD"
kind: unit
parent: 01M842QZ3FKXXEHWAAFWR98HF7
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Implement player token signing and session endpoint

Add the player package with HMAC token Sign/Verify and the session handler setting a Secure HttpOnly cookie, and register the route.

## Acceptance criteria
- Session returns 201 with id and cookie
- Token verifies with same secret


## Scope
- In scope: player package
- In scope: route
- Out of scope: me endpoint
- Preserve: healthz


## Technical constraints
- no storage
- New file: `backend/internal/player/token.go`
- New file: `backend/internal/player/handler.go`
- New file: `backend/internal/server/server.go`


## Dependencies
- A1


## Definition of done
- Build succeeds


## Clarifying questions
- None
