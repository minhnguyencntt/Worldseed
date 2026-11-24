---
id: "01M84HZNH9QWZBGWQ7NQPQMD8V"
kind: unit
parent: 01M84HZNH83HVDAEZNT04YH2EH
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Kept contribution, player and round routes unchanged unit tests

Run and, where missing, extend existing kept-route tests; mocked Git and temp dirs only.

## Acceptance criteria
- Contribution, player and round routes return their existing statuses
- GET /api/v1/contributions/{id} with an unknown id reaches the handler, not the router 404


## Scope
- In scope: backend/internal/server/server_test.go
- Out of scope: product code
- Preserve: existing tests


## Technical constraints
- httptest only


## Definition of done
- Kept-route tests pass


## Clarifying questions
- None
