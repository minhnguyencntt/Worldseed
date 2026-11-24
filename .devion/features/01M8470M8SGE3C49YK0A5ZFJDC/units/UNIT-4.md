---
id: "01M8470M8THDHMM041AZFSGBHQ"
kind: unit
parent: 01M8470M8T8AH3QDGD1YGYRJ1G
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Tick ignores non-due rounds and survives open failure unit tests

Tests use the fakes in scheduler_test.go and advance fakeClock manually.

## Acceptance criteria
- TestTick_IgnoresFutureAndOtherStatuses asserts zero calls at 12:00 and open plus close calls at 13:00.
- TestTick_OpenErrorIsReturnedAndCloseStillRuns asserts errors.Is(err, openErr) and that the close call is recorded after the failed open.


## Scope
- In scope: backend/internal/round/scheduler_test.go
- Out of scope: Run loop
- Preserve: Existing test helpers


## Technical constraints
- Everything mocked; no real clock


## Definition of done
- Both tests pass with -count=1


## Clarifying questions
- None
