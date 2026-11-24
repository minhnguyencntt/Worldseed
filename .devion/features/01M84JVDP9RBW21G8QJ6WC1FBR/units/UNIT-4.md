---
id: "01M84JVDPAH2Z6FX7MXFZ1468G"
kind: unit
parent: 01M84JVDP93P4F2VFZNBMCWSVY
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Exporter empty round and error propagation unit tests

Tests for empty list JSON and ErrNotFound propagation using fakes.

## Acceptance criteria
- Empty round marshals contributions as []
- ErrNotFound propagates via errors.Is


## Scope
- In scope: exporter_test.go
- Out of scope: real filesystem
- Preserve: existing tests


## Technical constraints
- Define an errSource fake in the test file returning a set error


## Definition of done
- Tests pass


## Clarifying questions
- None
