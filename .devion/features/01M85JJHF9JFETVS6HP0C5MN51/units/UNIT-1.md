---
id: "01M85JJHFAV9XP106HCQE9BDRP"
kind: unit
parent: 01M85JJHFAQD7BB7AZ8EMY0PYG
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add focusedObjectId field to gameStore

Edit game/frontend/src/store/gameStore.ts to add the focusedObjectId field typed string | null with initial value null.

## Acceptance criteria
- GameStoreState declares focusedObjectId: string | null
- The store initial value for focusedObjectId is null


## Scope
- In scope: gameStore.ts field
- Out of scope: setter
- Out of scope: tests
- Preserve: state, setState, init


## Technical constraints
- Code path: `game/frontend/src/store/gameStore.ts`


## Definition of done
- Field present and defaulted; tsc passes


## Clarifying questions
- None
