---
id: "01M85KEAVZTJYT35G6MHCCW5T4"
kind: unit
parent: 01M85KEAVYC749XHV0V461PZ5E
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Shutdown clears scene and store focus unit tests

Add tests/bootSceneShutdownFocus.test.ts using the Phaser/content/buildScene mocks from tests/bootSceneFocusClear.test.ts.

## Acceptance criteria
- Focused object is blurred and store id null after shutdown.
- No-focus case leaves state null.


## Scope
- In scope: New test file
- Out of scope: Product code
- Preserve: Other tests


## Technical constraints
- All Phaser, content and engine dependencies mocked


## Dependencies
- ACT1


## Definition of done
- Tests pass


## Clarifying questions
- None
