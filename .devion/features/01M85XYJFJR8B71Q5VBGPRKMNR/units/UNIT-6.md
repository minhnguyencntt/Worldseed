---
id: "01M85XYJFK348J60X6K0N1Q15J"
kind: unit
parent: 01M85XYJFJRE797SK1M1GZHDYT
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Header loading, error, retry, empty and icon control unit tests

New test file asserting REQ3 criteria with the real uiStore.

## Acceptance criteria
- Loading, error, retry and empty pill state tests pass.
- The sound and settings icon test changes the real uiStore and passes.


## Scope
- In scope: tests/headerKitStates.test.tsx
- Out of scope: product code
- Preserve: existing headerOverlay*.test.tsx


## Technical constraints
- Unit tests only.


## Dependencies
- ACT3


## Definition of done
- Tests pass


## Clarifying questions
- None
