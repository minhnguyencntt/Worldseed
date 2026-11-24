---
id: "01M844TV9Q9Z7R4H4R65KZ1K3E"
kind: unit
parent: 01M844TV9QSM531W5EP6MNP6B2
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Hotspot click opens the action menu unit tests

Write tests/appFlow.test.tsx with an in-memory mock of runtime/storage and assert the menu flow.

## Acceptance criteria
- Given Begin clicked, when Bookshelf clicked, then region Bookshelf has data-object-id bookshelf and four action buttons
- Given Begin clicked and nothing selected, then no region named Bookshelf exists


## Scope
- In scope: game/frontend/tests/appFlow.test.tsx
- Out of scope: Product code
- Preserve: tests/app.test.tsx


## Technical constraints
- Mock ../src/runtime/storage with vi.mock


## Dependencies
- A1


## Definition of done
- Tests pass with the command below


## Clarifying questions
- None
