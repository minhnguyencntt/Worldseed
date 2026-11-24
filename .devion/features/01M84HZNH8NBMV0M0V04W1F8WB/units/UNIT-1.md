---
id: "01M84HZNH8JD9W2NWV355N4EP9"
kind: unit
parent: 01M84HZNH8B0HE5VKZZK5Y7B52
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Confirm server.New and adminRoundRoutes hold only round admin routes

Read server.go and remove any execution/worker route, handler, store or import if present. Current source already has only five round routes in adminRoundRoutes; keep it that way.

## Acceptance criteria
- adminRoundRoutes returns exactly five round routes
- server.go imports no execution or worker package


## Scope
- In scope: backend/internal/server/server.go
- Out of scope: other packages
- Preserve: admin.Middleware


## Technical constraints
- Do not alter kept routes
- Code path: `backend/internal/server/server.go`


## Definition of done
- server.go contains no execution or worker reference


## Clarifying questions
- None
