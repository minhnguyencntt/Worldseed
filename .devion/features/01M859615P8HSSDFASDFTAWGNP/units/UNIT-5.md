---
id: "01M859615Q4J5WHTW2BEXYEQWK"
kind: unit
parent: 01M859615PNP2Z8Y5RX90X6NDW
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Scene layer ordering, entity creation and visibility unit tests via @game

Context: ACT-B confirmed buildScene and SceneObject behavior. Desired behavior: a suite asserts ordering, entity creation and visibility through @game with a fake RenderContext. Expected result: three tests pass. Why: proves REQ-B from the spec.

## Acceptance criteria
- Depths ascend background<furniture<objects
- createSprite called once per object with asset, position, scale
- setVisible gets false then true as flag toggles


## Scope
- In scope: tests/sceneAliasBuild.test.ts
- Out of scope: Phaser
- Preserve: existing tests


## Technical constraints
- Imports only from @game/... and ./fixtures/valid-world


## Dependencies
- ACT-B
- VER-A


## Definition of done
- test passes


## Clarifying questions
- None
