---
id: "01M8641PTXNRE58DM6D6GNQ6E6"
kind: unit
parent: 01M8641PTXGRCNHEJC3C09ZMES
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: describeRoundError SyntaxError unit tests

Add tests in appRound.test.tsx for the SyntaxError branch and for the header showing it when getCurrentRound rejects.

## Acceptance criteria
- SyntaxError maps to the explained text
- Header does not show the raw parser message


## Scope
- In scope: game/frontend/tests/appRound.test.tsx
- Out of scope: Real network
- Preserve: Existing tests


## Technical constraints
- getCurrentRound is already mocked with vi.fn in this file; reject with a SyntaxError built in the test, no payload fixture needed


## Definition of done
- Tests pass


## Clarifying questions
- None
