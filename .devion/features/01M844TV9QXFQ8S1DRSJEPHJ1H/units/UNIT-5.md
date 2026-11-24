---
id: "01M844TV9QWSE1PC9EGTF8EW4S"
kind: unit
parent: 01M844TV9QW0YRM90MDWP5PGTA
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Action and choice update the story unit tests

Add tests in tests/appFlow.test.tsx for Search and dialogue choice flows with mocked storage.

## Acceptance criteria
- Given Bookshelf menu, when Search clicked, then Story history list has the hidden door text
- Given opening dialogue, when Look around the room clicked, then region Dialogue is gone and history has the text


## Scope
- In scope: game/frontend/tests/appFlow.test.tsx
- Out of scope: Product code
- Preserve: tests/app.test.tsx


## Technical constraints
- Reuse the storage mock from V1's file


## Dependencies
- A2


## Definition of done
- Tests pass


## Clarifying questions
- None
