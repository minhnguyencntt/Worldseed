---
id: "01M845WDCXSZHWN3BS35Z9PG69"
kind: unit
parent: 01M845WDCXAQBJCMW0RN5NVSMQ
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Move the current round route to /round/current

In backend/internal/server/server.go line 46, change the Chi route path from /api/v1/worlds/{id}/rounds/current to /api/v1/worlds/{id}/round/current, keeping the wh.CurrentRound handler.

## Acceptance criteria
- server.go registers GET /api/v1/worlds/{id}/round/current to wh.CurrentRound
- server.go no longer registers /rounds/current


## Scope
- In scope: backend/internal/server/server.go
- Out of scope: world package
- Preserve: Other routes


## Technical constraints
- Chi router
- Code path: `backend/internal/server/server.go`


## Definition of done
- go build ./... succeeds in backend
- Route string changed


## Clarifying questions
- None
