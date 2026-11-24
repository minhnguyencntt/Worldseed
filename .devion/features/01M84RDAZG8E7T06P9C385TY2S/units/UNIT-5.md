---
id: "01M84RDAZH0KFHTVR0JE459S0B"
kind: unit
parent: 01M84RDAZH8ZAJAP4ACCCSKXVB
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Typed event bus delivery unit tests

Test createEventBus from REQ2 criteria.

## Acceptance criteria
- Given emit objectClick, Then the listener gets the payload once.
- Given unsubscribe, Then no further calls.


## Scope
- In scope: tests/phaserEvents.test.ts
- Out of scope: scenes
- Preserve: none


## Technical constraints
- No mocks needed beyond vi.fn


## Dependencies
- ACT2


## Definition of done
- Test file passes


## Clarifying questions
- None
