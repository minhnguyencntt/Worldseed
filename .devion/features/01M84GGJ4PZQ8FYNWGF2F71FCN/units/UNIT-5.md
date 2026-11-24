---
id: "01M84GGJ4QBQJA078VXX3TFMJB"
kind: unit
parent: 01M84GGJ4PPSXVKAPAYCY6PWN7
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Recover scan and resume unit tests with fake store

Tests in recovery_test.go with in-memory fakes only.

## Acceptance criteria
- Only unfinished statuses are resumed
- List error is returned wrapped


## Scope
- In scope: recovery_test.go
- Out of scope: Product code


## Technical constraints
- Fakes: fakeStore, fakeResumer; no filesystem


## Definition of done
- Tests pass


## Clarifying questions
- None
