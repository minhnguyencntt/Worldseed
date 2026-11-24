---
id: "01M859615QR5KP58FGA497VM9H"
kind: unit
parent: 01M859615PNP2Z8Y5RX90X6NDW
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Confirm buildScene and SceneObject expose ordering and visibility behavior

Read src/engine/buildScene.ts, src/entities/SceneObject.ts and src/engine/layers.ts; keep exports buildScene, SceneObject, LAYER_ORDER, layerDepth named and unchanged.

## Acceptance criteria
- buildScene returns SceneObject[] sorted ascending by depth
- SceneObject.sync calls setVisible with the evaluateAll result


## Scope
- In scope: named exports
- Out of scope: behavior changes
- Preserve: signatures


## Technical constraints
- Code path: `game/src/engine/buildScene.ts`
- Code path: `game/src/entities/SceneObject.ts`


## Dependencies
- REQ-B


## Definition of done
- exports confirmed, no behavior change


## Clarifying questions
- None
