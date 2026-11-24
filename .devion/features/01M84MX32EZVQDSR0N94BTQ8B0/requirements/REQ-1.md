---
id: "01M84MX32EE5F4KTCDSKMVYBD9"
kind: requirement
parent: 01M84MX32EZVQDSR0N94BTQ8B0
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Default state and every action of the real store are asserted in one suite

Context: existing tests split drawer/modal, sound/settings and hook subscription, and none asserts every default together or that actions are functions. Desired behavior: a consolidated suite covers defaults and each action, including double toggle returning to the default and openModal replacing then closeModal clearing the modal. Expected result: any regression in a default or action fails a named test. Why: complete coverage for SG-1.2.3.

## Acceptance criteria
- Given the initial state, when read, then all four fields hold their defaults and five actions are functions.
- Given each toggle action called twice, when state is read after each call, then the value flips then returns to its default, leaving other fields unchanged.
- Given openModal('contribution') then closeModal(), when state is read after each, then modal is 'contribution' then null.


## Scope
- In scope: Default state and action assertions
- Out of scope: New store features
- Preserve: uiStore.ts behavior


## Technical constraints
- Real store only; reset via getInitialState between tests


## Definition of done
- All default and action assertions pass


## Clarifying questions
- None
