---
id: "01M847BKYNXQQ4NVJNBR061JTA"
kind: unit
parent: 01M847BKYN2M148R286XKAT0W4
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Confirm Tick open and close dispatch against the injected clock

scheduler.go already contains the switch in Tick. Read it and make it match the requirement; change nothing if it already does. Result: Tick opens due SCHEDULED rounds, closes expired OPEN rounds and ignores other states before their boundary.

## Acceptance criteria
- Tick calls Open only for SCHEDULED rounds where !now.Before(StartsAt)
- Tick calls Close only for OPEN rounds where !now.Before(EndsAt)


## Scope
- In scope: Scheduler.Tick switch in scheduler.go
- Out of scope: Run loop
- Preserve: Public signatures of Scheduler, Clock, Controller, Lister


## Technical constraints
- Read time through s.clock() only
- Code path: `backend/internal/round/scheduler.go`


## Definition of done
- Tick dispatch matches REQ1 with no behavior beyond it


## Clarifying questions
- None
