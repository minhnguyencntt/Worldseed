---
id: "01M85J8EHFJGE15ZNEQ5Q4QMNH"
kind: unit
parent: 01M85J8EHEKPASQZ85118TEDM8
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: gameStore focus field and action unit tests

Test the real store with no mocks; it has no external dependencies.

## Acceptance criteria
- Default is null
- Setter sets and clears the id


## Scope
- In scope: game/frontend/tests/gameStoreFocus.test.ts
- Out of scope: BootScene
- Preserve: gameStore.test.ts


## Technical constraints
- vitest; reset store between tests


## Definition of done
- Test file passes


## Clarifying questions
- None
