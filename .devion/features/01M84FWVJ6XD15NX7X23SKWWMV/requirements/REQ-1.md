---
id: "01M84FWVJ6C61VXM4E86SEWHDM"
kind: requirement
parent: 01M84FWVJ6XD15NX7X23SKWWMV
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · The store's execution ID validation is reusable by other packages

Context: store.validateID is unexported, so another package cannot apply the same rule. Desired behavior: an exported store.ValidateID with identical behavior, used by Save and Get. Expected result: one source of truth for ID safety. Why: the intent requires validating the ID the same way the state store does.

## Acceptance criteria
- Given "../evil" or an empty string, When store.ValidateID is called, Then it returns an error wrapping ErrInvalidID
- Given "exec-1.2", When store.ValidateID is called, Then it returns nil


## Scope
- In scope: Rename validateID to ValidateID in store.go
- Out of scope: Changing the ID pattern
- Preserve: ErrInvalidID semantics
- Preserve: Save and Get rejecting bad ids


## Technical constraints
- Behavior must be unchanged


## Definition of done
- ValidateID exported and used by Save and Get


## Clarifying questions
- None
