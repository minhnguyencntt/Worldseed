---
id: "01M859KF8TSGTT0DZ41J9PK4A7"
kind: unit
parent: 01M859KF8TRGXPZTM1CXZRTZCZ
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Object action state transition and inventory unit tests

Test performAction on all five key objects with the real scene.

## Acceptance criteria
- Bed adds old-key
- Computer, window and bookshelf set flags
- Door gated by old-key


## Scope
- In scope: game/frontend/tests/objectActions.test.ts


## Technical constraints
- Real scene, pure functions


## Dependencies
- ACT3


## Definition of done
- Tests green


## Clarifying questions
- None
