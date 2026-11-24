---
id: "01M84FCFCPDRT18NQJJYC25RK0"
kind: unit
parent: 01M84FCFCPBXYMG9K6PWY33XMM
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Worker config validation unit tests

Add table-driven test asserting each invalid setting is rejected with key-naming error and valid ones are accepted.

## Acceptance criteria
- Each invalid input yields nil config and error naming the key
- mock and claude accepted


## Scope
- In scope: config_test.go
- Out of scope: product code
- Preserve: existing tests


## Dependencies
- ACT2


## Definition of done
- Tests pass


## Clarifying questions
- None
