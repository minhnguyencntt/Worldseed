---
id: "01M85JVDXDRKDPSK0RKCSJ12B8"
kind: unit
parent: 01M85JVDXD0P0J6D2SCH53FQHD
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add applyFocusedObject to BootScene to focus the matching object

Add a private method to BootScene that focuses the SceneObject whose spec.id equals the given id, reusing SceneObject.focus().

## Acceptance criteria
- applyFocusedObject('bookshelf') calls focus() on the object with spec.id 'bookshelf'
- Objects with other ids are not focused by it


## Scope
- In scope: New private method in BootScene.ts
- Out of scope: Wiring into onStateChange
- Out of scope: Tests
- Preserve: All existing BootScene methods


## Technical constraints
- No new Phaser API use
- Code path: `game/frontend/src/phaser/BootScene.ts`


## Dependencies
- REQ-1


## Definition of done
- Method exists and type-checks


## Clarifying questions
- None
