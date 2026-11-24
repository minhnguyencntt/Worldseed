---
id: "01M85JVDXD0P0J6D2SCH53FQHD"
kind: requirement
parent: 01M85JVDXCBWET0NQHXCYBVNB1
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Scene focuses the object matching the store focusedObjectId

Context: BootScene.onStateChange only syncs objects with GameState. Desired behavior: on each store change it reads focusedObjectId and calls focus() on the SceneObject whose spec.id equals it. Expected result: that object shows the hover highlight and label. Why: store-driven focus must reach the canvas.

## Acceptance criteria
- Given focusedObjectId 'bookshelf' and a SceneObject with spec.id 'bookshelf' when the store notifies then that object's focus() is called
- Given focusedObjectId names a different object then the 'bookshelf' object's focus() is not called


## Scope
- In scope: BootScene focus application
- Out of scope: Keyboard handler writes
- Preserve: sceneObjects sync(state) calls


## Technical constraints
- Match by SceneObject.spec.id


## Dependencies
- INT-1


## Definition of done
- BootScene focuses the matching object on store change


## Clarifying questions
- None
