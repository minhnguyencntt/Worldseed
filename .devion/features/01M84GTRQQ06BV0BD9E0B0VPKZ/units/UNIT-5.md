---
id: "01M84GTRQRR125M8XK4F6RQPTD"
kind: unit
parent: 01M84GTRQQ9YRC2H0ESABRFGYK
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Expired Round closing unit tests with fake clock and Closer

Write backend/worker/internal/poller/poller_close_test.go reusing the fakes from poller_detect_test.go.

## Acceptance criteria
- Expired OPEN Round is closed once; boundary EndsAt==now closes; future EndsAt does not.
- Closed ID appears in ClosedNow and Closed.


## Scope
- In scope: backend/worker/internal/poller/poller_close_test.go
- Out of scope: Product code changes
- Preserve: Product code


## Technical constraints
- Fake clock only; no real time


## Definition of done
- Tests pass


## Clarifying questions
- None
