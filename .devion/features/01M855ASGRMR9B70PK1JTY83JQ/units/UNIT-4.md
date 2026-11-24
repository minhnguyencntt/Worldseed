---
id: "01M855ASGS1096BAPKQRNFKYMJ"
kind: unit
parent: 01M855ASGSKJS9WVS6S394X2KQ
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: BootScene preload and fallback unit tests

Extend the Phaser mock like game/frontend/tests/bootSceneEffects.test.ts with load.image, load.spritesheet and load.on fakes; mock @game/engine/preload planPreload.

## Acceptance criteria
- preload test asserts load.image and load.spritesheet are called for planned entries
- loaderror test asserts the key is recorded and the fallback texture is generated


## Scope
- In scope: game/frontend/tests/bootScenePreload.test.ts
- Out of scope: real browser


## Technical constraints
- Plan fixture mirrors PreloadPlan type from game/src/engine/preload.ts


## Definition of done
- Tests pass


## Clarifying questions
- None
