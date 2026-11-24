---
id: "01M84MX32ENR5463N9S1582BQ6"
kind: unit
parent: 01M84MX32EE5F4KTCDSKMVYBD9
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Real store defaults and each action unit tests

Write game/frontend/tests/uiStoreReal.test.ts importing the real store and asserting defaults, double toggles and modal open/close, with state reset in beforeEach.

## Acceptance criteria
- Given reset state, when read, then defaults and five function actions are asserted.
- Given each toggle twice, when read, then flip then restore is asserted with other fields unchanged.
- Given openModal then closeModal, when read, then 'contribution' then null.


## Scope
- In scope: tests/uiStoreReal.test.ts
- Out of scope: Product code edits
- Preserve: Existing uiStore tests


## Technical constraints
- Real store only; no browser or server


## Definition of done
- Test file passes via its own command


## Clarifying questions
- None
