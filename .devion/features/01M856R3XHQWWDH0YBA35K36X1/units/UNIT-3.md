---
id: "01M856R3XH6DQPAC7K0KMSTP43"
kind: unit
parent: 01M856R3XHA7BGZAFG9X6B0WT4
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Sync SceneObjects with the store and emit objectClick

After building objects, BootScene syncs them with the store state and forwards activations to phaserToReact.

## Acceptance criteria
- sync runs in create and on each store change with non-null state
- onInteract emits objectClick


## Scope
- In scope: BootScene.create, onStateChange
- Out of scope: Hover events
- Preserve: readState


## Technical constraints
- No state copy in BootScene
- Code path: `game/frontend/src/phaser/BootScene.ts`


## Dependencies
- R3
- A2


## Definition of done
- Store changes reach every SceneObject


## Clarifying questions
- None
