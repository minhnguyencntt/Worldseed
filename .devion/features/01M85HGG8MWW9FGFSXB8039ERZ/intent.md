---
id: "01M85HGG8MWW9FGFSXB8039ERZ"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-10 Connect Phaser pointer and keyboard events to the game store

Context: BootScene already emits objectClick (App opens ActionMenu) and re-syncs SceneObjects on every gameStore change. SceneObject already shows hover highlight/label and keyboard focus. Gaps: the typed objectHover event is declared in PhaserToReactEvents but never emitted, and the typed highlightObject event in ReactToPhaserEvents is never consumed. Desired behavior: hover and click flow Phaser to React, store changes (secret door open, inventory) flow back into the scene, and unit tests cover both directions. Why: the Phaser scene and React UI must stay consistent without duplicated state.

## Acceptance criteria
- Given a scene object, when the pointer hovers it, then the highlight and label show and objectHover is emitted with its id; on pointer out objectHover carries null
- Given a clicked object, when objectClick is emitted, then App selects it and shows its ActionMenu
- Given a store change such as secret_door_open flag or an inventory item, when the state updates, then every SceneObject receives sync with the new state
- Given a highlightObject event from React, when it is emitted, then the matching scene object takes focus highlight and label and null clears it
- Given unit tests, when run, then they cover Phaser to React and store to Phaser directions


## Scope
- In scope: SceneObject hover listener
- In scope: BootScene objectHover emission and highlightObject subscription
- In scope: Unit tests in both directions
- Out of scope: New assets or content
- Out of scope: Backend or API changes
- Out of scope: Reworking the ActionMenu
- Preserve: Existing objectClick bridge and App ActionMenu
- Preserve: useGameStore as single source of GameState
- Preserve: Phaser mocked in unit tests


## Technical constraints
- Use the typed phaserToReact and reactToPhaser buses in game/frontend/src/phaser/events.ts
- BootScene must not keep its own copy of GameState


## Definition of done
- All three requirements have passing unit tests
- Existing bootScene and appObjectClick tests still pass


## Non-functional requirements
- Subscriptions are released on scene SHUTDOWN


## Clarifying questions
- None
