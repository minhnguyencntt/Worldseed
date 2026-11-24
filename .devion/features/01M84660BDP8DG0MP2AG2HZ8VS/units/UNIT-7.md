---
id: "01M84660BFP8FC6ZQER4M89MX2"
kind: unit
parent: 01M84660BEVMZGCSHF8R8048NY
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Round transition table and FileStore unit tests

Write TDD-style tests in internal/round using t.TempDir only.

## Acceptance criteria
- Every legal edge passes and a table of illegal edges returns ErrIllegalTransition with status unchanged
- Save then Get round-trips all fields; unsafe ids are rejected


## Scope
- In scope: backend/internal/round/round_test.go
- In scope: backend/internal/round/store_test.go
- Out of scope: network, git


## Technical constraints
- Temp dir filesystem only


## Dependencies
- A1


## Definition of done
- Tests pass


## Clarifying questions
- None
