---
id: "01M859KF8VMCCBYVT7R36YAJTB"
kind: unit
parent: 01M859KF8TY8NF7FBN1G9AWZQ1
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Persistence, restore and secret door re-entry unit tests

Unit tests for save validation, restore via useGame and scene view.

## Acceptance criteria
- Door visible only when flag true
- Corrupt element types rejected
- Door open after remount and goto_scene round trip


## Scope
- In scope: game/tests/persistenceStrict.test.ts
- In scope: game/frontend/tests/secretDoorPersistence.test.tsx


## Technical constraints
- jsdom localStorage only; no server


## Dependencies
- ACT4


## Definition of done
- Tests green


## Clarifying questions
- None
