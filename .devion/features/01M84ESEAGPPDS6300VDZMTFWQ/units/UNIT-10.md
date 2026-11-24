---
id: "01M84ESEAJTAB4X9RA9HDYXHV6"
kind: unit
parent: 01M84ESEAHBWH8RE5PX59GVS0P
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Mock provider and Claude adapter unit tests with a fake Exec

Tests use a fake Exec capturing dir, stdin, name and args.

## Acceptance criteria
- Mock values returned
- No prompt text in argv
- Restricted tools asserted
- Errors wrapped


## Scope
- In scope: worker/internal/provider/provider_test.go
- Out of scope: Product code
- Preserve: Act code


## Technical constraints
- No real binary


## Definition of done
- Tests pass in seconds


## Clarifying questions
- None
