---
id: "01M847BKYNR36K3PCV1H1NJN4M"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-5.5 · Scheduler behavior with a fake clock unit tests

Context: backend/internal/round/scheduler.go already implements Scheduler.Tick with an injected Clock, Controller and Lister. backend/internal/round/scheduler_test.go already holds tests using fakeClock, fakeController and fakeLister. Desired behavior: the four named scheduler behaviors are covered by passing unit tests that use only fakes. Expected result: go test for those tests passes. Why: the round lifecycle must open and close rounds on time without a real clock.

## Acceptance criteria
- Given a SCHEDULED round whose StartsAt is before the fake clock time, when Tick runs, then Controller.Open is called once for that round and Close is not called
- Given an OPEN round whose EndsAt is before the fake clock time, when Tick runs, then Controller.Close is called once for that round
- Given future-start SCHEDULED, future-end OPEN and COMPLETED rounds, when Tick runs before the boundary, then no Controller call is made, and when the clock reaches the boundary, then only the due Open and Close calls are made
- Given Controller.Open returns an error and another round is due for Close, when Tick runs, then Tick returns an error wrapping the Open error and Close is still called for the other round


## Scope
- In scope: Scheduler.Tick behavior with a fake clock
- In scope: Unit tests in backend/internal/round/scheduler_test.go
- Out of scope: Scheduler.Run ticker loop
- Out of scope: Real Controller, store or Git behavior
- Out of scope: Admin routes and server wiring
- Preserve: Scheduler, Clock, Controller and Lister public signatures
- Preserve: Tick error joining via errors.Join


## Technical constraints
- Go standard testing package only
- No real clock, sleep, filesystem or network in the tests


## Definition of done
- All four Tick behaviors are asserted by passing unit tests


## Non-functional requirements
- Tests finish in milliseconds


## Clarifying questions
- None
