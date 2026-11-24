---
id: "01M85KP4J9PXC4C457637NQK7F"
kind: unit
parent: 01M85KP4J9NMDZZQ92VNPTYFRG
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Keyboard moves write the store focusedObjectId unit tests

Add bootSceneKeyboardStore.test.ts reusing the Phaser, content, buildScene and moveFocus mocks from tests/bootSceneKeyboard.test.ts.

## Acceptance criteria
- Tab sets store focusedObjectId to 'bookshelf'.
- Shift+Tab and ArrowLeft call setFocusedObject with 'bookshelf'.
- focusChange still emitted.


## Scope
- In scope: New test file
- Out of scope: Browser runs
- Preserve: Existing keyboard tests


## Technical constraints
- Phaser, content and engine mocked


## Definition of done
- Tests pass


## Clarifying questions
- None
