---
id: "01M85JJHFAGDV8MJC4908CWKKF"
kind: unit
parent: 01M85JJHFAQ0ZMXH0F08WGQ88W
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add setFocusedObject action to gameStore

Edit game/frontend/src/store/gameStore.ts to declare and implement setFocusedObject(id: string | null) which sets focusedObjectId only.

## Acceptance criteria
- setFocusedObject(id) sets focusedObjectId to id
- setFocusedObject(null) clears it and leaves state untouched


## Scope
- In scope: gameStore.ts action
- Out of scope: tests
- Out of scope: scene wiring
- Preserve: state, setState, init


## Technical constraints
- Code path: `game/frontend/src/store/gameStore.ts`


## Dependencies
- ACT-1 field


## Definition of done
- Action present and typed; tsc passes


## Clarifying questions
- None
