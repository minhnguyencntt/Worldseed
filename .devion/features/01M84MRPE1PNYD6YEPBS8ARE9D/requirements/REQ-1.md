---
id: "01M84MRPE2R3TQRBBQP3XKMA46"
kind: requirement
parent: 01M84MRPE1PNYD6YEPBS8ARE9D
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · UI store holds drawer and modal state with toggleDrawer, openModal and closeModal

Context: no UI store exists. Desired behavior: uiStore.ts is a Zustand store with drawerOpen (boolean) and modal (ModalId or null), plus toggleDrawer, openModal(id) and closeModal. Expected result: components can drive the drawer and modal from one store. Why: the mobile drawer and contribution modal need shared state.

## Acceptance criteria
- Given a fresh store, when read, then drawerOpen is false and modal is null
- Given the store, when toggleDrawer is called twice, then drawerOpen goes true then false
- Given the store, when openModal('contribution') is called and then closeModal, then modal is 'contribution' then null


## Scope
- In scope: drawerOpen
- In scope: modal
- In scope: toggleDrawer
- In scope: openModal
- In scope: closeModal
- Out of scope: Sound and settings flags
- Preserve: Existing GameLayout local state until a later wiring task


## Technical constraints
- Use zustand create


## Dependencies
- zustand declared in package.json


## Definition of done
- State and actions exist and are typed


## Clarifying questions
- None
