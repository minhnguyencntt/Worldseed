---
id: "01M85HGG8NRMRRCDP6GQ98T313"
kind: unit
parent: 01M85HGG8MGN0HY726W3BARVXN
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Store changes for the secret door and inventory reach every SceneObject

BootScene with fake objects; real useGameStore.

## Acceptance criteria
- Flag change synced
- Inventory change synced
- Null ignored


## Scope
- In scope: game/frontend/tests/bootSceneStoreToScene.test.ts
- Out of scope: Source changes


## Technical constraints
- Phaser mocked; real gameStore


## Dependencies
- ACT-3


## Definition of done
- Test file passes


## Clarifying questions
- None
