---
id: "01M85HGG8N974QN3QGKZWTWP2K"
kind: unit
parent: 01M85HGG8M0YT3Y0A9H2PV7295
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Hover emits objectHover and SceneObject hover listener

Tests with fake RenderContext and mocked Phaser.

## Acceptance criteria
- Hover in/out events asserted
- Hidden object produces no listener call


## Scope
- In scope: game/tests/sceneObjectHover.test.ts
- In scope: game/frontend/tests/bootSceneHover.test.ts
- Out of scope: Source changes


## Technical constraints
- Phaser mocked; no browser


## Dependencies
- ACT-1


## Definition of done
- Both test files pass


## Clarifying questions
- None
