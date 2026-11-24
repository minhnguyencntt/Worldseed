---
id: "01M847EPY09HCS6FFKN7K1T2ZN"
kind: unit
parent: 01M847EPY0M8XVMW5W4VJV2HN3
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Confirm admin round routes are mounted from adminRoundRoutes in server.New

The code already registers the five round routes via adminRoutes(eh, rh) inside r.Route("/api/v1/admin"). Read it and keep it unchanged; add a missing route only if one of the five is absent.

## Acceptance criteria
- Given server.go, when adminRoundRoutes is read, then POST /rounds, POST /rounds/{id}/open, POST /rounds/{id}/close, GET /rounds/{id} and GET /rounds/{id}/contributions are present
- Given New, when it builds the admin group, then admin.Middleware(cfg.Admin.Token) is applied before the routes


## Scope
- In scope: backend/internal/server/server.go
- Out of scope: Handler logic
- Preserve: adminRoute table shape


## Technical constraints
- Code path: `backend/internal/server/server.go`


## Definition of done
- Five round routes confirmed mounted behind the middleware


## Clarifying questions
- None
