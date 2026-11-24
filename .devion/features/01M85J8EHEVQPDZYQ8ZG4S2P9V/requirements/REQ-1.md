---
id: "01M85J8EHEKPASQZ85118TEDM8"
kind: requirement
parent: 01M85J8EHEVQPDZYQ8ZG4S2P9V
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Game store holds the focused object id

Context: useGameStore in game/frontend/src/store/gameStore.ts holds only state, setState and init. Desired behavior: add a focusedObjectId field (default null) and a setFocusedObject action. Expected result: any module can set and read the focused object id. Why: the scene needs a shared place to read focus from.

## Acceptance criteria
- Given a fresh store, when focusedObjectId is read, then it is null
- Given the store, when setFocusedObject('bookshelf') is called, then focusedObjectId is 'bookshelf'
- Given a focused id, when setFocusedObject(null) is called, then focusedObjectId is null


## Scope
- In scope: gameStore focus field and action
- Out of scope: scene changes
- Preserve: init and setState semantics


## Technical constraints
- Keep init and setState behavior unchanged


## Definition of done
- Field and action exist with typed signatures


## Clarifying questions
- None
