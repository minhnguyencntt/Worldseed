---
id: "01M8470M8SGE3C49YK0A5ZFJDC"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-5.2 · Scheduler auto-opens due rounds and auto-closes expired rounds

Context: backend/internal/round/scheduler.go defines Scheduler.Tick, which reads the injected Clock and calls Controller.Open for SCHEDULED rounds whose StartsAt has passed and Controller.Close for OPEN rounds whose EndsAt has passed. Errors are joined with errors.Join so one failure does not stop the pass. Current state: the four TestTick_* tests in scheduler_test.go pass on the repository tip (go test -count=1 ./internal/round/ is ok). Desired behavior: the scheduler keeps this contract. Expected result: due rounds open, expired rounds close, future and other-status rounds are ignored, and closing continues after an open failure. Why: the lifecycle must advance without admin action.

## Acceptance criteria
- Given a SCHEDULED round whose StartsAt is not after the clock time, when Tick runs, then Controller.Open is called once for that round.
- Given an OPEN round whose EndsAt is not after the clock time, when Tick runs, then Controller.Close is called once for that round.
- Given future SCHEDULED or OPEN rounds and rounds in other statuses, when Tick runs, then no Controller call is made until the clock reaches the boundary.
- Given Controller.Open returns an error, when Tick runs, then Close for another expired OPEN round still runs and Tick returns an error wrapping the open error.


## Scope
- In scope: backend/internal/round/scheduler.go Tick behavior
- In scope: scheduler unit tests using a fake clock and fake controller
- Out of scope: Lifecycle Open/Close implementation
- Out of scope: admin routes
- Out of scope: frontend
- Preserve: Scheduler, Clock, Controller and Lister exported types
- Preserve: errors.Join aggregation in Tick
- Preserve: Run loop and defaultInterval


## Technical constraints
- Go; no database; the clock must be injected through Scheduler.Clock
- Tests must not use real time or real controllers


## Definition of done
- All four TestTick_* tests pass with go test -count=1
- No other behavior of the round package changes


## Clarifying questions
- None
