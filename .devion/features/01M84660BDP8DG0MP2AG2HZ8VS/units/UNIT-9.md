---
id: "01M84660BFWTPGSNK83K6ZS0TG"
kind: unit
parent: 01M84660BEXQG4BYA5BVZ1P4KE
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Scheduler behavior with a fake clock unit tests

Test Tick decisions only; no real timers.

## Acceptance criteria
- Open called once for due SCHEDULED round
- Close called once for expired OPEN round
- No calls for future rounds or other statuses


## Scope
- In scope: backend/internal/round/scheduler_test.go
- Out of scope: Run ticker


## Technical constraints
- fakeClock, fakeController, fakeLister


## Dependencies
- A3


## Definition of done
- Tests pass


## Clarifying questions
- None
