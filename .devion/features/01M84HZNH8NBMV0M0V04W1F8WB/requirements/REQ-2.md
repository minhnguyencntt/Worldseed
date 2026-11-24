---
id: "01M84HZNH83HVDAEZNT04YH2EH"
kind: requirement
parent: 01M84HZNH8NBMV0M0V04W1F8WB
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Contribution, player, world and round routes are unchanged

Context: contribution intake and round lifecycle must stay intact. Desired behavior: server.New still mounts healthz, player session/me, world routes, round/current, contribution create/mine/get and admin round routes with the same handlers. Expected result: unchanged statuses and bodies. Why: owner-kept features must not regress.

## Acceptance criteria
- Given server.New, when POST /api/v1/contributions, GET /api/v1/player/me/contributions and GET /api/v1/contributions/{id} are sent, then they reach the contribution handlers
- Given server.New, when GET /api/v1/worlds/{id}/round/current and admin round routes are sent, then the existing statuses are returned


## Scope
- In scope: backend/internal/server/server.go
- Out of scope: handler implementations
- Preserve: all route patterns in server.New


## Technical constraints
- No change to route patterns or handler wiring


## Definition of done
- Route registrations for kept routes are unmodified


## Clarifying questions
- None
