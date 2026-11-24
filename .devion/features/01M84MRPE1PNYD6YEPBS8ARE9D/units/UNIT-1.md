---
id: "01M84MRPE2RHW7FB7316E7T7X0"
kind: unit
parent: 01M84MRPE2R3TQRBBQP3XKMA46
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Create uiStore.ts with drawer and modal state and actions

Create game/frontend/src/store/uiStore.ts with the Zustand store, drawerOpen, modal, toggleDrawer, openModal and closeModal.

## Acceptance criteria
- Given the file, when imported, then drawerOpen is false and modal is null
- Given the actions, when called, then state updates as specified


## Scope
- In scope: New uiStore.ts
- Out of scope: Tests
- Out of scope: Sound and settings flags
- Preserve: Other src files


## Technical constraints
- zustand create
- New file: `game/frontend/src/store/uiStore.ts`


## Definition of done
- File exists and compiles


## Clarifying questions
- None
