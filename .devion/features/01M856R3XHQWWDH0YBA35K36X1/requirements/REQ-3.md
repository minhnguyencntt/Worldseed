---
id: "01M856R3XHA7BGZAFG9X6B0WT4"
kind: requirement
parent: 01M856R3XHQWWDH0YBA35K36X1
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · BootScene syncs objects with the store and forwards clicks to React

Context: SceneObject.sync applies visibleWhen and onInteract reports activations; BootScene.onStateChange currently only reads state. Desired behavior: after building, BootScene syncs every object with the current state and on each store change, and emits phaserToReact objectClick with the object id on activation. Expected result: persistent object state (e.g. secret door) shows after changes. Why: React and Phaser stay consistent without duplicate state.

## Acceptance criteria
- Given a non-null store state, when create runs, then sync(state) is called on each built object
- Given a store change to a new state, when onStateChange runs, then sync(newState) is called on each object
- Given a null state, when onStateChange runs, then no sync is called
- Given an object's onInteract callback, when invoked with objectId, then phaserToReact.emit('objectClick', {id}) is called


## Scope
- In scope: BootScene.create, onStateChange
- Out of scope: Hover events
- Out of scope: Keyboard focus wiring
- Preserve: readState
- Preserve: subscription cleanup


## Technical constraints
- No GameState copy kept in BootScene


## Dependencies
- R2


## Definition of done
- Objects reflect store state and clicks reach the bus


## Clarifying questions
- None
