---
id: "01M84RDAZHA1ATMCBFW3GC7DBC"
kind: unit
parent: 01M84RDAZH3GA0FRPBKV7WD8HE
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add the Zustand game store, move useGame onto it and add BootScene

Create gameStore, refactor useGame to use it and add a Phaser scene that reads from it.

## Acceptance criteria
- Given useGame, When read, Then state comes from useGameStore.
- Given BootScene, When read, Then it keeps no GameState field.


## Scope
- In scope: gameStore.ts
- In scope: useGame.ts
- In scope: BootScene.ts
- Out of scope: tests
- Out of scope: rendering
- Preserve: useGame return shape
- Preserve: readSaved and writeSaved


## Technical constraints
- Zustand ^5
- Phaser.Scene subclass
- New file: `game/frontend/src/store/gameStore.ts`
- Code path: `game/frontend/src/runtime/useGame.ts`
- New file: `game/frontend/src/phaser/BootScene.ts`


## Dependencies
- REQ3
- ACT2


## Definition of done
- tsc --noEmit passes


## Clarifying questions
- None
