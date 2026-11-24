---
id: "01M85J8EHFFD8NG4C2YNJCJSHS"
kind: unit
parent: 01M85J8EHEKPASQZ85118TEDM8
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add focusedObjectId and setFocusedObject to gameStore

Add a focusedObjectId field defaulting to null and a setFocusedObject action to useGameStore in gameStore.ts without changing init or setState.

## Acceptance criteria
- focusedObjectId defaults to null
- setFocusedObject sets the value


## Scope
- In scope: game/frontend/src/store/gameStore.ts
- Out of scope: tests
- Preserve: init and setState


## Technical constraints
- Typed with string | null
- Code path: `game/frontend/src/store/gameStore.ts`


## Definition of done
- Interface and creator updated; tsc passes


## Clarifying questions
- None
