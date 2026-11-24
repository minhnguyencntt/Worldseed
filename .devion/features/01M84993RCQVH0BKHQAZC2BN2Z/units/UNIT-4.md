---
id: "01M84993RD97HMHCH0SV64TE3C"
kind: unit
parent: 01M84993RDFE29BTK2QNC5YEK5
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: AdminApp execution action error display unit tests

Extend tests/adminActions.test.tsx with failure cases using the same URL-routing fetch stub.

## Acceptance criteria
- A 500 from an action shows an alert in the Execution region
- A 401 from an action shows the token gate with Invalid token
- A later successful action clears the alert


## Scope
- In scope: game/frontend/tests/adminActions.test.tsx
- Out of scope: Real network or browser
- Preserve: Existing tests


## Technical constraints
- Fixtures mirror backend execution JSON


## Dependencies
- ACT2


## Definition of done
- Tests pass


## Clarifying questions
- None
