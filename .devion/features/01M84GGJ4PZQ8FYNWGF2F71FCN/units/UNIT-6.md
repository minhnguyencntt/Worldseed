---
id: "01M84GGJ4QVMK7BVEPABT4S1M1"
kind: unit
parent: 01M84GGJ4PPSXVKAPAYCY6PWN7
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Failed resume marks RECOVERING unit tests with fake clock

Tests in recovery_mark_test.go using the fakes from recovery_test.go and a fixed clock.

## Acceptance criteria
- Failed resume saves RECOVERING with error and clock time
- Next execution still resumed
- Save failure is returned


## Scope
- In scope: recovery_mark_test.go
- Out of scope: Product code


## Technical constraints
- Fixed clock time.Date(2026,1,2,3,4,5,0,time.UTC)


## Definition of done
- Tests pass


## Clarifying questions
- None
