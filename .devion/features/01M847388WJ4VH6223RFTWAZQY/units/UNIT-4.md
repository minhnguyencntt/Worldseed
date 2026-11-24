---
id: "01M847388XDD8V3D9R1N6HM7VC"
kind: unit
parent: 01M847388WCYP1TSR5X4DBT638
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: NewScheduler wiring unit tests

Run and, where absent, add a unit test for NewScheduler using a temp dir repo path and no real clock or network.

## Acceptance criteria
- Interval equals configured 7s
- Controller and Rounds are non-nil


## Scope
- In scope: backend/internal/server/server_test.go
- Out of scope: Running the scheduler loop
- Preserve: Existing tests


## Technical constraints
- No goroutines started


## Definition of done
- Test passes


## Clarifying questions
- None
