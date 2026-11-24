---
id: "01M847BKYNV6TSRC365AVQ2RHY"
kind: unit
parent: 01M847BKYN2M148R286XKAT0W4
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Scheduler open, close and boundary behavior with a fake clock unit tests

Tests in scheduler_test.go use fakeClock, fakeController and fakeLister only; no real time, I/O or network.

## Acceptance criteria
- TestTick_OpensDueRound asserts calls equal one open for w1/r1
- TestTick_ClosesExpiredRound asserts calls equal one close for w1/r1
- TestTick_IgnoresFutureAndOtherStatuses asserts no calls at 12:00 and open plus close at 13:00


## Scope
- In scope: backend/internal/round/scheduler_test.go
- Out of scope: Real controller
- Preserve: Existing fakes fakeClock, fakeController, fakeLister


## Technical constraints
- Fakes only


## Definition of done
- The three tests pass


## Clarifying questions
- None
