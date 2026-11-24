---
id: "01M85M0QGQZF1GX19K18M3X8Y2"
kind: unit
parent: 01M85M0QGPSDDKDS5AV7X1D5C1
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: BootScene handles playAnimation and transitionTo unit tests

Add a test file modelled on bootSceneCharacters.test.ts with the fake Phaser, emitting reactToPhaser events.

## Acceptance criteria
- playAnimation interact plays the interact key then idle
- transitionTo calls cameras.main.fadeIn with the authored duration
- Events after SHUTDOWN do nothing


## Scope
- In scope: game/frontend/tests/bootSceneReactEvents.test.ts
- Out of scope: Product code
- Preserve: Existing bootSceneCharacters tests


## Technical constraints
- Phaser fully mocked; no browser


## Definition of done
- New tests pass


## Clarifying questions
- None
