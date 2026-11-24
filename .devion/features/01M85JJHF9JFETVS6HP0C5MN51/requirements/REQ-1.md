---
id: "01M85JJHFAQD7BB7AZ8EMY0PYG"
kind: requirement
parent: 01M85JJHF9JFETVS6HP0C5MN51
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Game store exposes focusedObjectId defaulting to null

Context: GameStoreState has no focus field. Desired behavior: GameStoreState declares focusedObjectId: string | null and the store initializes it to null. Expected result: reading it on a fresh store returns null and init/setState do not alter it. Why: gives consumers a defined focus value before any key press.

## Acceptance criteria
- Given a fresh store, when focusedObjectId is read, then it is null
- Given init is called with a GameState, when focusedObjectId is read, then it is still null


## Scope
- In scope: focusedObjectId field and default
- Out of scope: setter action
- Out of scope: scene wiring
- Preserve: state, setState, init


## Technical constraints
- Type is string | null


## Definition of done
- Field typed and defaulted to null


## Clarifying questions
- None
