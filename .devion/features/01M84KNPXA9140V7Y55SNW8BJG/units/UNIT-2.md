---
id: "01M84KNPXBJWXQBKC3G7CYRWWD"
kind: unit
parent: 01M84KNPXBTJTMK9Y6AKKFC9R3
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Create the useUiStore Zustand store

Create the store module with typed state and actions.

## Acceptance criteria
- useUiStore exports state and all actions
- initial values match the requirement


## Scope
- In scope: store file
- Out of scope: tests
- Preserve: useGame


## Technical constraints
- Zustand create()
- New file: `game/frontend/src/store/uiStore.ts`


## Definition of done
- Store compiles under tsc


## Clarifying questions
- None
