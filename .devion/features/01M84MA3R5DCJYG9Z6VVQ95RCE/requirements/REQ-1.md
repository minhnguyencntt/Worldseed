---
id: "01M84MA3R5A9DSS9762ZFN3X1D"
kind: requirement
parent: 01M84MA3R5DCJYG9Z6VVQ95RCE
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Zustand dependency and drawer and modal state with actions

Context: no store exists. Desired behavior: useUiStore holds drawerOpen (default false) and activeModal (null | 'contribution' | 'settings') with toggleDrawer, setDrawerOpen, openModal and closeModal. Expected result: importable store. Why: drawer and contribution modal need shared state.

## Acceptance criteria
- Given a fresh store, When read, Then drawerOpen is false and activeModal is null
- Given a fresh store, When toggleDrawer is called twice, Then drawerOpen is true then false
- Given a fresh store, When openModal('contribution') then closeModal() are called, Then activeModal is 'contribution' then null


## Scope
- In scope: package.json zustand dependency
- In scope: drawer and modal state/actions
- Out of scope: sound and settings flags
- Out of scope: component rewiring
- Preserve: Existing dependencies


## Technical constraints
- Use zustand create with typed state interface


## Definition of done
- Drawer and modal actions implemented


## Clarifying questions
- None
