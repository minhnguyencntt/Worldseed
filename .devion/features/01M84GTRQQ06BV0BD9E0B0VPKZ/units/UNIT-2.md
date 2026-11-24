---
id: "01M84GTRQRJE2S8Y3JFW8PG499"
kind: unit
parent: 01M84GTRQQ9YRC2H0ESABRFGYK
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Close expired OPEN Rounds in Poll through the Closer

Extend Poller.Poll in poller.go with an OPEN case using the injected Clock.

## Acceptance criteria
- Expired OPEN Rounds are closed once; non-expired are not.
- Closed IDs appear in ClosedNow and Closed.


## Scope
- In scope: backend/worker/internal/poller/poller.go
- Out of scope: Error handling beyond collecting Close errors
- Out of scope: Tests
- Preserve: Detection behavior


## Technical constraints
- Use p.clock.Now().Before(r.EndsAt) for the expiry check
- New file: `backend/worker/internal/poller/poller.go`


## Definition of done
- poller.go builds and expired Rounds are closed


## Clarifying questions
- None
