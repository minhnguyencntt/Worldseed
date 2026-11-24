---
id: "01M84MRPE2BXZC4VPZF4HPZNZM"
kind: unit
parent: 01M84MRPE2R3TQRBBQP3XKMA46
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Drawer and modal store unit tests

Write unit tests that import the real useUiStore and assert drawer and modal state changes. Nothing from the store is mocked.

## Acceptance criteria
- Given a reset store, when toggleDrawer is called twice, then drawerOpen is true then false
- Given a reset store, when openModal('contribution') then closeModal are called, then modal is 'contribution' then null


## Scope
- In scope: game/frontend/tests/uiStoreDrawerModal.test.ts
- Out of scope: Product code
- Preserve: Other tests


## Technical constraints
- Vitest, jsdom environment
- Reset state in beforeEach with useUiStore.setState(useUiStore.getInitialState())


## Definition of done
- Tests pass


## Clarifying questions
- None
