---
id: "01M85JVDXDDVFS5YEPTA0ZD58P"
kind: unit
parent: 01M85JVDXDWHNRBZJEBP0J7DG1
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Null store focus clears scene focus unit tests

Write Phaser-mocked unit tests proving REQ-2.

## Acceptance criteria
- Setting focusedObjectId null blurs a focused object
- No focus or blur call when nothing is focused and id is null


## Scope
- In scope: Add tests to game/frontend/tests/bootSceneFocus.test.ts
- Out of scope: Product code
- Preserve: Test from VER-1


## Technical constraints
- Same mocks as VER-1


## Dependencies
- ACT-2


## Definition of done
- Tests pass


## Clarifying questions
- None
