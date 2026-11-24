---
id: "01M845WDCXBQN5ET27KSG7SP13"
kind: unit
parent: 01M845WDCXAQBJCMW0RN5NVSMQ
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Current round route unit tests

Add a server routing test that seeds a temp repo with a world and a round and asserts the singular path serves 200, the plural path 404, and an unknown world 404.

## Acceptance criteria
- GET /api/v1/worlds/the-boys-room/round/current returns 200 with id round-0000001
- GET /rounds/current returns 404
- Unknown world returns 404


## Scope
- In scope: backend/internal/server/server_test.go
- Out of scope: Production code
- Preserve: Existing server tests


## Technical constraints
- Use t.TempDir and httptest only; no live ports


## Definition of done
- TestNew_CurrentRoundRoute passes


## Clarifying questions
- None
