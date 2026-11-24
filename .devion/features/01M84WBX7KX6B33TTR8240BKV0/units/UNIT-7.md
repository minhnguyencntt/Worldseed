---
id: "01M84WBX7MTQSR23R8H9VF7Y4S"
kind: unit
parent: 01M84WBX7KM5QJ5Z0V8SPC91P2
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Hover, click, visibility and keyboard unit tests

Fake DisplayHandle captures registered callbacks so tests can fire pointer events.

## Acceptance criteria
- Hover, pointerout, pointerdown, bounds and action-less objects are asserted on SceneObject
- Context action filtering, focus wrapping and bus events for pointer and ENTER are asserted


## Scope
- In scope: game/tests/interaction.test.ts
- In scope: game/tests/sceneObject.test.ts
- In scope: game/frontend/tests/worldSceneEvents.test.ts
- Out of scope: product code


## Technical constraints
- Phaser mocked


## Definition of done
- Tests green


## Clarifying questions
- None
