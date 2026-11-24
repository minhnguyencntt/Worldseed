---
id: "01M84F6TVG1HPTSSKT6FMWKNKF"
kind: unit
parent: 01M84F6TVF93MMXGC3MNASZ8J5
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: JSON execution store unit tests

Test store in t.TempDir().

## Acceptance criteria
- Round-trip asserted
- List ordering asserted
- ErrInvalidID and ErrNotFound asserted


## Scope
- In scope: backend/worker/internal/store/store_test.go
- Out of scope: product code


## Technical constraints
- t.TempDir() only


## Definition of done
- tests pass


## Clarifying questions
- None
