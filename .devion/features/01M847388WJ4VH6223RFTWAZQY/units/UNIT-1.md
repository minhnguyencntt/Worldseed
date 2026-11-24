---
id: "01M847388XGWC6CEVCX9114HTE"
kind: unit
parent: 01M847388WXGP6KNXQ9HBGKD8K
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Confirm admin round route registration in server.New

Read server.New admin group and confirm POST /rounds, open, close, GET /rounds/{id} and contributions map to rh.Create, Open, Close, Get, Contributions; correct any missing route.

## Acceptance criteria
- All five round routes registered in the admin group
- go build ./... succeeds


## Scope
- In scope: backend/internal/server/server.go
- Out of scope: admin handlers
- Preserve: executions routes


## Technical constraints
- Routes stay inside r.Route admin group using ar.Use(admin.Middleware)
- Code path: `backend/internal/server/server.go`


## Definition of done
- Routes registered; build passes


## Clarifying questions
- None
