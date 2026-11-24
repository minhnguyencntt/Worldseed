---
id: "01M84ESEAH833B4MR4DG55GX2J"
kind: unit
parent: 01M84ESEAH23C7FD1XQ8E9VC2H
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Round poller and expired-Round closer unit tests with mocked Git and clock

Tests use a fake Git recording calls, a fixed clock and t.TempDir.

## Acceptance criteria
- Detection split asserted
- Snapshot mode 0444 and CLOSED round.yaml asserted
- Existing snapshot not overwritten
- Non-expired Round untouched


## Scope
- In scope: worker/internal/rounds/rounds_test.go
- Out of scope: Product code
- Preserve: Act code


## Technical constraints
- Fixture shape mirrors backend/internal/round/snapshot.go and backend/internal/round/round.go yaml tags


## Definition of done
- Tests pass in seconds


## Clarifying questions
- None
