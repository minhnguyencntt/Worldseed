---
id: "01M84XZS83S234TJECYTZC0YK3"
kind: unit
parent: 01M84XZS83AM5PMH68YPMGT0QD
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: BootScene plays the authored transition on create

Add a test file frontend/tests/bootSceneTransition.test.ts mocking phaser, @game/engine/buildEffects and ../src/phaser/effectContext.

## Acceptance criteria
- create() calls the context playTransition with the content duration
- No call when the scene has no transition


## Scope
- In scope: New test file
- Out of scope: Product code
- Preserve: bootSceneEffects.test.ts


## Technical constraints
- Follow the phaser mock in frontend/tests/bootSceneEffects.test.ts; mock ../src/runtime/content to supply the scene


## Dependencies
- ACT-2


## Definition of done
- Tests pass


## Clarifying questions
- None
