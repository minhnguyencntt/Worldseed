---
id: "01M84F6TVG5MCDJJ2EW4K062HS"
kind: unit
parent: 01M84F6TVF4EVQD8XE0PHEJTJ1
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: File lock unit tests

Test lock in t.TempDir().

## Acceptance criteria
- ErrLocked asserted
- Re-acquire after Release asserted


## Scope
- In scope: backend/worker/internal/lock/lock_test.go
- Out of scope: product code


## Technical constraints
- t.TempDir() only


## Definition of done
- tests pass


## Clarifying questions
- None
