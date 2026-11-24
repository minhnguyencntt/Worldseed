---
id: "01M8470M8T9BC85XFQSVAAYGZG"
kind: unit
parent: 01M8470M8TT0EX42R1Q92WSVCZ
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Confirm Tick open and close dispatch against the injected clock

Scheduler.Tick already dispatches Open and Close using clock.Now(). This unit keeps that code correct: the boundary comparison uses !now.Before so a time equal to StartsAt or EndsAt counts as due. No behavior change is expected unless the Verify unit finds a mismatch.

## Acceptance criteria
- Given a SCHEDULED round with StartsAt not after the clock, when Tick runs, then Controller.Open is called.
- Given an OPEN round with EndsAt not after the clock, when Tick runs, then Controller.Close is called.


## Scope
- In scope: backend/internal/round/scheduler.go Tick switch cases
- Out of scope: tests
- Preserve: Public API of the round package


## Technical constraints
- Clock must come from s.clock()
- Code path: `backend/internal/round/scheduler.go`


## Definition of done
- Tick switch cases use !now.Before(StartsAt) and !now.Before(EndsAt)
- go build ./internal/round/ succeeds


## Clarifying questions
- None
