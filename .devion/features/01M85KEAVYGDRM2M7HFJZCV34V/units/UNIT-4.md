---
id: "01M85KEAVZ78AX9HH24B4FX0Q3"
kind: unit
parent: 01M85KEAVYH6ASHXSSAQ54DNJE
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Store changes after shutdown do not reach the scene unit tests

Add tests/bootSceneShutdownUnsubscribe.test.ts with the same mocks, asserting no scene calls after shutdown.

## Acceptance criteria
- After shutdown setFocusedObject does not call focus on objects.
- State updates after shutdown do not call sync.


## Scope
- In scope: New test file
- Out of scope: Product code
- Preserve: Other tests


## Technical constraints
- All Phaser, content and engine dependencies mocked


## Dependencies
- ACT2


## Definition of done
- Tests pass


## Clarifying questions
- None
