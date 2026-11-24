---
id: "01M84HZNH8B0HE5VKZZK5Y7B52"
kind: requirement
parent: 01M84HZNH8NBMV0M0V04W1F8WB
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · server.New registers and implements no execution, approve or retry routes

Context: server.New builds routes under /api/v1/admin from adminRoundRoutes. Desired behavior: that table lists only the five round routes and New builds no execution store, handler, worker or config dependency. Expected result: execution, approve and retry paths are unreachable. Why: remove development automation from the server.

## Acceptance criteria
- Given server.New, when GET /api/v1/admin/executions and POST /api/v1/admin/executions/x/approve and /retry are sent with the admin token, then the status is 404 or 405
- Given adminRoundRoutes, when listed, then it has exactly the five round routes (create, open, close, get, contributions)
- Given the server sources, when scanned, then no execution or worker import remains


## Scope
- In scope: backend/internal/server/server.go
- Out of scope: contribution routes
- Preserve: adminRoute struct and adminRoundRoutes table shape


## Technical constraints
- Keep admin.Middleware on /api/v1/admin


## Definition of done
- server.go has no execution wiring


## Clarifying questions
- None
