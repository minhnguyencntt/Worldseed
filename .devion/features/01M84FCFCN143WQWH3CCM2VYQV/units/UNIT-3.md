---
id: "01M84FCFCPENHYC66EVKBQYDNX"
kind: unit
parent: 01M84FCFCNBNVEEKQ95N64VS9Q
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Worker config new-field defaults and overrides unit tests

Add tests in config_test.go with fstest.MapFS proving defaults and explicit values.

## Acceptance criteria
- Defaults asserted for the four new fields
- Explicit YAML values returned unchanged


## Scope
- In scope: config_test.go
- Out of scope: product code
- Preserve: existing tests


## Dependencies
- ACT1


## Definition of done
- Tests pass


## Clarifying questions
- None
