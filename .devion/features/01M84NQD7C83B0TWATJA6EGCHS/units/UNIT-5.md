---
id: "01M84NQD7D8D7XTSZ2TNBFB2YZ"
kind: unit
parent: 01M84NQD7C9ASFHTA9BV50NTS6
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: HeaderOverlay store-wired controls unit tests

Write unit tests from REQ2 using the real uiStore.

## Acceptance criteria
- Clicks flip store flags
- Both control tests pass against the real store


## Scope
- In scope: tests/headerOverlayControls.test.tsx
- Out of scope: Product code


## Technical constraints
- Reset store with useUiStore.setState(useUiStore.getInitialState(), true)


## Dependencies
- ACT2


## Definition of done
- Tests green


## Clarifying questions
- None
