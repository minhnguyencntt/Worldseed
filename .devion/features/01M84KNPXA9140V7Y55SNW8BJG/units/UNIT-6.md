---
id: "01M84KNPXB2ZTQ1TJDA1J5W8HV"
kind: unit
parent: 01M84KNPXBTJTMK9Y6AKKFC9R3
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: UI store action unit tests

Test the store with no mocks needed beyond resetting state.

## Acceptance criteria
- Every action asserted
- Initial state asserted


## Scope
- In scope: game/frontend/tests/uiStore.test.ts
- Out of scope: components


## Technical constraints
- Reset with useUiStore.setState(initial) in beforeEach


## Definition of done
- Tests pass


## Clarifying questions
- None
