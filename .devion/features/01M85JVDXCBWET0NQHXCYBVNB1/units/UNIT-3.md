---
id: "01M85JVDXDD5X8ETJM7FBF0E3Z"
kind: unit
parent: 01M85JVDXD0P0J6D2SCH53FQHD
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Store focus focuses the matching scene object unit tests

Write a Phaser-mocked unit test proving REQ-1.

## Acceptance criteria
- Setting focusedObjectId 'bookshelf' calls focus() on the bookshelf fake only
- The 'bed' fake's focus() is not called when focusedObjectId is 'bookshelf'


## Scope
- In scope: New test file game/frontend/tests/bootSceneFocus.test.ts
- Out of scope: Product code
- Preserve: Existing tests


## Technical constraints
- Mock phaser, ../src/runtime/content, @game/engine/buildScene, buildEffects, playSceneTransition, phaser renderContext and effectContext the same way tests/bootSceneKeyboard.test.ts does


## Dependencies
- ACT-1


## Definition of done
- Test passes


## Clarifying questions
- None
