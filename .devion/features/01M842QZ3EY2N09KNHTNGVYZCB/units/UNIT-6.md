---
id: "01M842QZ3GPJ5FNW7582VRRT0D"
kind: unit
parent: 01M842QZ3FFD12VY1QT4VGDQY7
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Me endpoint 401 and 200 unit tests

Offline httptest table tests using fixed clock.

## Acceptance criteria
- Given a valid token, when Me is called, then 200 and the player id are asserted
- Given missing, tampered, wrong-secret, expired or garbage tokens, when Me is called, then 401 is asserted


## Scope
- In scope: me tests


## Technical constraints
- httptest, fixed Now func


## Definition of done
- Tests pass offline


## Clarifying questions
- None
