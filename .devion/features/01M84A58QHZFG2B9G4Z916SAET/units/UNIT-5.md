---
id: "01M84A58QJ5AN1T95D7NXVMXXA"
kind: unit
parent: 01M84A58QJ8ZYTYTPZF3QJ0360
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Create round duration request unit tests

Test createRound and the Create round button with mocked fetch.

## Acceptance criteria
- Body has world_id and duration 12h.
- 401 returns to token gate.


## Scope
- In scope: tests/adminCreateRound.test.tsx
- Out of scope: Product code
- Preserve: Existing tests


## Technical constraints
- fetch mocked


## Definition of done
- Tests pass


## Clarifying questions
- None
