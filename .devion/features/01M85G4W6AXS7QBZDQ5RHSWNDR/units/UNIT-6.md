---
id: "01M85G4W6BVAHEVR61ZX3G5AHV"
kind: unit
parent: 01M85G4W6AFSNHZ3WQXQA4JVAF
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: History error alert and Retry unit tests

Add unit tests asserting the error test id, Retry button and return to loading.

## Acceptance criteria
- Rejected listMine shows contribution-history-error and Retry
- Retry shows loading again and calls listMine twice


## Scope
- In scope: tests/contributionHistoryRetry.test.tsx
- Out of scope: Product code
- Preserve: Existing tests


## Technical constraints
- Mock listMine


## Definition of done
- Tests pass


## Clarifying questions
- None
