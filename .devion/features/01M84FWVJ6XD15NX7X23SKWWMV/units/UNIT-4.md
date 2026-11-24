---
id: "01M84FWVJ77BHTBC8S42NVPY35"
kind: unit
parent: 01M84FWVJ6C61VXM4E86SEWHDM
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: store.ValidateID unit tests

Prove ValidateID accepts safe ids and rejects unsafe ones.

## Acceptance criteria
- Unsafe ids wrap ErrInvalidID
- Safe ids return nil


## Scope
- In scope: store_test.go
- Out of scope: other packages
- Preserve: existing store tests


## Definition of done
- Test passes


## Clarifying questions
- None
