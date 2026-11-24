---
id: "01M8470M8TT1WBB4FS8HN1MHRQ"
kind: unit
parent: 01M8470M8TT0EX42R1Q92WSVCZ
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Tick opens due and closes expired rounds unit tests

Tests use fakeClock, fakeController and fakeLister from scheduler_test.go so no real time, filesystem or controller is involved.

## Acceptance criteria
- TestTick_OpensDueRound asserts exactly one open call for the due SCHEDULED round.
- TestTick_ClosesExpiredRound asserts exactly one close call for the expired OPEN round.


## Scope
- In scope: backend/internal/round/scheduler_test.go
- Out of scope: integration with Lifecycle
- Preserve: Existing test helpers


## Technical constraints
- Everything mocked; no real clock


## Definition of done
- Both tests pass with -count=1


## Clarifying questions
- None
