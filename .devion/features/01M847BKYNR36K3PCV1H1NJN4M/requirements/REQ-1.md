---
id: "01M847BKYN2M148R286XKAT0W4"
kind: requirement
parent: 01M847BKYNR36K3PCV1H1NJN4M
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Tick opens due SCHEDULED rounds, closes expired OPEN rounds and waits for future and COMPLETED rounds

Context: Scheduler.Tick in backend/internal/round/scheduler.go compares clock.Now() with StartsAt for SCHEDULED rounds and EndsAt for OPEN rounds. Desired behavior: due rounds are opened or closed, while future-start, future-end and COMPLETED rounds are ignored until the boundary. Expected result: Controller receives exactly the due Open and Close calls. Why: rounds must change state at the right time.

## Acceptance criteria
- Given a SCHEDULED round with StartsAt 11:00 and clock 12:00, when Tick runs, then Open is called with the world ID and round ID
- Given an OPEN round with EndsAt 11:59 and clock 12:00, when Tick runs, then Close is called with the world ID and round ID
- Given future SCHEDULED, future OPEN and COMPLETED rounds at clock 12:00, when Tick runs, then no calls are made, and at clock 13:00 only Open and Close for the two non-COMPLETED rounds are made


## Scope
- In scope: Tick switch cases on Status and clock boundary
- Out of scope: Error aggregation behavior
- Preserve: !now.Before(boundary) comparison so the exact boundary instant counts as due


## Technical constraints
- Time comes only from Scheduler.Clock


## Definition of done
- Tick dispatch against the clock is confirmed in scheduler.go and covered by tests


## Clarifying questions
- None
