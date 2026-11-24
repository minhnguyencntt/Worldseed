---
id: "01M85XAD0NKF83DW7Q4Z35QM2A"
kind: unit
parent: 01M85XAD0N4PAXHSA1FB2BFJMR
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Token values come from the palette and Tailwind exposes them

Test tokens against PALETTE and the Tailwind config exports.

## Acceptance criteria
- Every colour token is in PALETTE
- Tailwind config exposes sf theme values referencing CSS vars


## Scope
- In scope: tests/tokens.test.ts
- Out of scope: product code
- Preserve: tests/paletteTailwind.test.ts


## Technical constraints
- All dependencies mocked; unit tests only


## Dependencies
- A1


## Definition of done
- tokens.test.ts passes


## Clarifying questions
- None
