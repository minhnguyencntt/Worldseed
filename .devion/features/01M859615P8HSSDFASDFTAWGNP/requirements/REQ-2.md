---
id: "01M859615PNP2Z8Y5RX90X6NDW"
kind: requirement
parent: 01M859615P8HSSDFASDFTAWGNP
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Scene suite proves layer ordering, content-to-entity creation and visibility via @game

Context: layers.ts, buildScene.ts and SceneObject.ts exist; buildScene sorts SceneObject by depth and sync() applies visibleWhen via evaluateAll. Desired behavior: one suite asserts these through @game with a fake RenderContext. Expected result: suite passes. Why: confirms SG-5.6.2 areas 1-3.

## Acceptance criteria
- Given objects authored in furniture, background, objects order, when buildScene runs, then depths come back ascending background, furniture, objects
- Given a scene with N objects, when buildScene runs, then createSprite is called N times with each spec's asset, position and scale
- Given an object with visibleWhen flag, when sync runs with the flag false then true, then setVisible receives false then true


## Scope
- In scope: layer ordering
- In scope: content-to-entity creation
- In scope: visibility conditions
- Out of scope: Phaser rendering
- Preserve: existing buildScene, sceneObject and layers tests


## Technical constraints
- Fake RenderContext, no real Phaser


## Dependencies
- REQ-A


## Definition of done
- suite green


## Clarifying questions
- None
