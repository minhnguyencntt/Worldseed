---
id: "01M85JJHF9JFETVS6HP0C5MN51"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-10.2.1 Focused-object id field and setter in the game store

Context: game/frontend/src/store/gameStore.ts exports useGameStore with state, setState and init only. Desired behavior: add a focusedObjectId field (string or null) and a setFocusedObject action so keyboard focus can later be pushed into the scene. Expected result: both exist on the real store and are unit tested. Why: SG-10.2 needs a shared focus source of truth without duplicating state in Phaser or React.

## Acceptance criteria
- Given a fresh store, when focusedObjectId is read, then it is null
- Given a fresh store, when setFocusedObject('bookshelf') is called, then focusedObjectId is 'bookshelf'
- Given a focused object, when setFocusedObject(null) is called, then focusedObjectId is null
- Given the existing store tests, when run, then init and setState behavior is unchanged


## Scope
- In scope: focusedObjectId field
- In scope: setFocusedObject action
- In scope: unit tests for both
- Out of scope: BootScene wiring
- Out of scope: keyboard handler changes
- Out of scope: UI rendering of focus
- Preserve: state, setState and init behavior
- Preserve: existing gameStore tests


## Technical constraints
- Use the existing zustand store in game/frontend/src/store/gameStore.ts
- Tests import the real store, not a mock


## Definition of done
- Field and action implemented
- Unit tests pass


## Clarifying questions
- None
