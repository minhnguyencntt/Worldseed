---
id: "01M84XMQSCX26SJ8XFHBXKH74M"
kind: unit
parent: 01M84XMQSBC9F758DGDT9XWBR4
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add Phaser effect context and wire it into BootScene

Create createPhaserEffectContext(scene) and use it in BootScene.create.

## Acceptance criteria
- Effects are built in BootScene.create from scene content
- Effect handles are destroyed on scene shutdown


## Scope
- In scope: phaser dir
- Out of scope: tests
- Preserve: sceneReady


## Technical constraints
- New file: `game/frontend/src/phaser/effectContext.ts`
- Code path: `game/frontend/src/phaser/BootScene.ts`


## Dependencies
- A2


## Definition of done
- Compiles under tsc


## Clarifying questions
- None
