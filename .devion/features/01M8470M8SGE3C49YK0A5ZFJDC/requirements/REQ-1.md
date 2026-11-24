---
id: "01M8470M8TT0EX42R1Q92WSVCZ"
kind: requirement
parent: 01M8470M8SGE3C49YK0A5ZFJDC
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Tick opens due SCHEDULED rounds and closes expired OPEN rounds using the injected clock

Context: Scheduler.Tick in backend/internal/round/scheduler.go uses a switch on rd.Status with !now.Before(rd.StartsAt) for SCHEDULED and !now.Before(rd.EndsAt) for OPEN. Desired behavior: due rounds open and expired rounds close exactly at the boundary. Expected result: one Open or Close call per due round. Why: automatic round lifecycle.

## Acceptance criteria
- Given a SCHEDULED round with StartsAt earlier than the clock, when Tick runs, then Open is called with the world and round IDs.
- Given an OPEN round with EndsAt earlier than the clock, when Tick runs, then Close is called with the world and round IDs.
- Given the clock equals StartsAt or EndsAt exactly, when Tick runs, then the round is acted on.


## Scope
- In scope: Open and Close dispatch in Tick
- Out of scope: Controller implementation
- Preserve: Controller interface signatures


## Technical constraints
- Use Scheduler.clock() so a nil Clock falls back to systemClock


## Definition of done
- Open and Close dispatch matches the acceptance criteria


## Clarifying questions
- None
