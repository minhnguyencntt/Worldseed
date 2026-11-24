---
id: "01M84NXPJPSE0G5MT19XB482HC"
kind: unit
parent: 01M84NXPJN2E1ESKQQCM1YSECF
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: GameLayout header slot unit tests

Add tests asserting header placement and absence.

## Acceptance criteria
- Header is inside main when passed.
- No header leaves layout intact.


## Scope
- In scope: tests/layout.test.tsx
- Out of scope: Product code
- Preserve: Existing layout tests


## Technical constraints
- Real GameLayout with real store; no network


## Definition of done
- Tests pass


## Clarifying questions
- None
