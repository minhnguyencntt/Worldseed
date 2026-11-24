---
id: "01M84ESEAHGMRNFR27R3HQBQCQ"
kind: unit
parent: 01M84ESEAHN6P1E1SV110MR099
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: JSON store and startup recovery unit tests

Test from R2 with t.TempDir, fake Now and fake Alive.

## Acceptance criteria
- Round trip and unsafe ID tests
- Resume, mark and untouched cases asserted
- Stale lock removal asserted


## Scope
- In scope: worker/internal/state/state_test.go
- In scope: worker/internal/recovery/recovery_test.go
- Out of scope: Product code changes
- Preserve: Act code


## Technical constraints
- No real processes


## Definition of done
- Tests pass in seconds


## Clarifying questions
- None
