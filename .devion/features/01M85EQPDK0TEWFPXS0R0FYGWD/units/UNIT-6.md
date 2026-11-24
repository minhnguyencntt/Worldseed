---
id: "01M85EQPDM87W8FKXPXV7DGSV8"
kind: unit
parent: 01M85EQPDM4PRXH1HC34P00Z8Z
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: History error and Retry unit tests

Test error rendering and that Retry re-calls listMine and recovers.

## Acceptance criteria
- Alert and Retry asserted on rejection
- Retry calls listMine twice and shows list


## Scope
- In scope: New test file
- Out of scope: Product code
- Preserve: Existing tests


## Technical constraints
- Mock listMine


## Definition of done
- Tests pass


## Clarifying questions
- None
