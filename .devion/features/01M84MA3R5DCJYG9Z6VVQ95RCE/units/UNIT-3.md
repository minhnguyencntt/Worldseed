---
id: "01M84MA3R6SN2051SGCC6RY0ND"
kind: unit
parent: 01M84MA3R5A9DSS9762ZFN3X1D
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Drawer and modal store unit tests

Write tests/uiStore.test.ts cases for drawer and modal behavior using useUiStore.setState reset between tests.

## Acceptance criteria
- Given a reset store, When toggleDrawer runs twice, Then drawerOpen is true then false
- Given a reset store, When openModal then closeModal run, Then activeModal is 'contribution' then null


## Scope
- In scope: tests/uiStore.test.ts
- Out of scope: browser


## Technical constraints
- No network or DOM needed


## Dependencies
- ACT1


## Definition of done
- Tests pass


## Clarifying questions
- None
