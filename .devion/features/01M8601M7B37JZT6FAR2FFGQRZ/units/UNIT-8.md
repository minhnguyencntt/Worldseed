---
id: "01M8601M7CA42992W547870238"
kind: unit
parent: 01M8601M7BRNMGXCC87NBSB6N8
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: transitionTo emitted on scene change and fade on a valid scene unit tests

App test with a mocked performAction scene change; BootScene test for the fade of a registered scene.

## Acceptance criteria
- Given an action moving currentScene, when run, then transitionTo is emitted
- Given a registered scene id, when transitionTo arrives, then cameras.main.fadeOut runs and scene.start follows the FADE_OUT_COMPLETE callback


## Scope
- In scope: tests/appTransition.test.tsx
- In scope: tests/bootSceneTransition.test.ts
- Out of scope: real Phaser
- Preserve: existing assertions


## Technical constraints
- Mock @game/engine/scene performAction to return a state with another currentScene


## Dependencies
- ACT-FADE


## Definition of done
- Tests pass


## Clarifying questions
- None
