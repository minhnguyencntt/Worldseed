---
id: "01M845WDCXAQBJCMW0RN5NVSMQ"
kind: requirement
parent: 01M845WDCWPKE3DX0JEY7MF1GB
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Current round is routed at GET /api/v1/worlds/{id}/round/current

Context: server.go registers wh.CurrentRound at /rounds/current. Desired behavior: register it at /round/current and drop the plural path. Expected result: the specified path serves the current round JSON. Why: it matches the API contract.

## Acceptance criteria
- Given seeded world and round files, when GET /api/v1/worlds/the-boys-room/round/current is requested, then status is 200 and the JSON round id is round-0000001
- When GET /api/v1/worlds/the-boys-room/rounds/current is requested, then status is 404
- When GET /api/v1/worlds/unknown/round/current is requested, then status is 404


## Scope
- In scope: server.go route registration
- Out of scope: Handler or repo changes
- Preserve: Other world routes


## Technical constraints
- Keep using wh.CurrentRound


## Definition of done
- Only the singular path is registered for the current round


## Clarifying questions
- None
