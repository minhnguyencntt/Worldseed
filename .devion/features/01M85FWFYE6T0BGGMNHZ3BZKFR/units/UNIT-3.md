---
id: "01M85FWFYF91BMDM40AYA7TA0S"
kind: unit
parent: 01M85FWFYE2GXA5JQX2YN2SWK7
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: History error message and Retry button unit tests

Add unit tests for the error state rendering with listMine mocked.

## Acceptance criteria
- Rejected listMine shows the alert text and Retry
- Resolved listMine shows neither


## Scope
- In scope: New test file
- Out of scope: Product code
- Preserve: Existing tests


## Technical constraints
- Mock ../src/api/client with vi.mock keeping actual exports


## Definition of done
- Tests pass


## Clarifying questions
- None
