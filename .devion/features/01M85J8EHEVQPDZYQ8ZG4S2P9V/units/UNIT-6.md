---
id: "01M85J8EHF6TZWPDTJQGC88E7P"
kind: unit
parent: 01M85J8EHFY1MFSYQ49XMYSNPW
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: shutdown removes focus unit tests

Run create with fake objects, trigger the captured shutdown handler, assert cleanup.

## Acceptance criteria
- Blur is called on every object
- Store focus id becomes null
- No focus calls after shutdown


## Scope
- In scope: game/frontend/tests/bootSceneFocusShutdown.test.ts
- Out of scope: real Phaser
- Preserve: existing shutdown tests


## Technical constraints
- Same mocks as bootSceneKeyboard.test.ts


## Definition of done
- Tests pass


## Clarifying questions
- None
