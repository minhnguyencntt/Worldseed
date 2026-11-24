---
id: "01M84XZS83CD2QK2D0KGDWZ7TH"
kind: unit
parent: 01M84XZS83AM5PMH68YPMGT0QD
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Call playSceneTransition from BootScene.create

In BootScene.create, create the effect context once, pass it to buildEffects and playSceneTransition.

## Acceptance criteria
- create() calls playSceneTransition(ctx, scene) after buildEffects
- Cleanup and sceneReady unchanged


## Scope
- In scope: BootScene.ts
- Out of scope: Tests
- Preserve: SHUTDOWN cleanup


## Technical constraints
- Phaser 3.90
- Code path: `game/frontend/src/phaser/BootScene.ts`


## Dependencies
- ACT-1


## Definition of done
- BootScene calls the helper


## Clarifying questions
- None
