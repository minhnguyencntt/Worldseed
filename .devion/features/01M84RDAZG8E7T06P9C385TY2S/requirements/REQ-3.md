---
id: "01M84RDAZH3GA0FRPBKV7WD8HE"
kind: requirement
parent: 01M84RDAZG8E7T06P9C385TY2S
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Phaser reads shared GameState from a Zustand store without duplicating it

Context: useGame.ts holds GameState in useState, which Phaser cannot read. Desired behavior: add src/store/gameStore.ts exporting useGameStore with state: GameState|null and setState(updater). useGame reads and writes this store while keeping its return shape and localStorage persistence. Add src/phaser/BootScene.ts, a Phaser.Scene that reads useGameStore.getState().state on demand, subscribes to store changes and emits sceneReady, without keeping its own copy. Expected result: one owner of state. Why: avoids duplicated state ownership.

## Acceptance criteria
- Given the store is set to a GameState, When BootScene.readState() runs, Then it returns the store's object by reference.
- Given the store changes, When the BootScene subscription fires, Then the scene reads the new state and holds no cached copy.
- Given useGame renders, When act is called, Then the store state updates and the return shape is unchanged.
- Given BootScene shuts down, When shutdown runs, Then the store subscription is removed.


## Scope
- In scope: gameStore
- In scope: useGame refactor to the store
- In scope: BootScene state reading
- Out of scope: rendering sprites
- Preserve: useGame return shape
- Preserve: readSaved/writeSaved persistence
- Preserve: existing useGame tests


## Technical constraints
- Zustand ^5
- BootScene extends Phaser.Scene


## Dependencies
- INT
- REQ2


## Definition of done
- useGame uses the store and existing tests still pass


## Non-functional requirements
- Subscription removed on shutdown


## Clarifying questions
- None
