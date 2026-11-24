---
id: "01M84MKK2FXX0RTPWXMGT7KW1G"
kind: requirement
parent: 01M84MKK2FWES7GK0Q0WHFNE4A
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · UI store exposes drawer and modal state with toggleDrawer, openModal and closeModal

Context: no UI store exists. Desired behavior: useUiStore exposes drawerOpen (default false) and modal (default null, otherwise a ModalId such as 'contribution'), with toggleDrawer, openModal(id) and closeModal. Expected result: components can open the drawer and modals via the store. Why: mobile bottom drawer and the contribution modal need shared state.

## Acceptance criteria
- Given initial state, when read, then drawerOpen is false and modal is null
- Given drawerOpen false, when toggleDrawer is called twice, then drawerOpen becomes true then false
- Given modal null, when openModal('contribution') is called, then modal equals 'contribution'; when closeModal is called, then modal is null


## Scope
- In scope: drawerOpen, modal, toggleDrawer, openModal, closeModal
- Out of scope: Sound and settings flags
- Preserve: Existing components


## Technical constraints
- Single store file src/store/uiStore.ts


## Definition of done
- State and actions implemented and typed


## Clarifying questions
- None
