---
id: "01M845SASNGXM84XREXWYYCQXK"
kind: requirement
parent: 01M845SASN3QAR9EWZF01RMEKV
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Player contribution history is routed at GET /api/v1/player/me/contributions

Context: server.New registers r.Get("/api/v1/contributions/mine", ch.Mine) at line 77. Desired behavior: register ch.Mine at /api/v1/player/me/contributions and remove the legacy registration. Expected result: the legacy path falls through to /contributions/{id} and responds 404 for the unknown id "mine". Why: consistent player-scoped API.

## Acceptance criteria
- Given a session cookie and round_id, when GET /api/v1/player/me/contributions is called, then status is 200 and body is a JSON array
- Given a session cookie, when GET /api/v1/contributions/mine is called, then status is 404
- Given no cookie, when GET /api/v1/player/me/contributions is called, then status is 401


## Scope
- In scope: backend/internal/server/server.go route registration
- Out of scope: Handler logic
- Preserve: Other routes


## Technical constraints
- Route must be registered after ch is constructed


## Definition of done
- Route moved


## Clarifying questions
- None
