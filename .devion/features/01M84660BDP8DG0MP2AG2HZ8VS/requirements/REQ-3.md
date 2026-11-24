---
id: "01M84660BEXQG4BYA5BVZ1P4KE"
kind: requirement
parent: 01M84660BDP8DG0MP2AG2HZ8VS
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Scheduler auto-opens and auto-closes rounds using an injected clock

Context: nothing triggers open/close at scheduled times. Desired behavior: Scheduler.Tick uses an injected Clock to open SCHEDULED rounds whose starts_at has passed and close OPEN rounds whose ends_at has passed. Expected result: rounds change state without admin action. Why: continuous cycle.

## Acceptance criteria
- Given a SCHEDULED round with starts_at <= clock now, when Tick runs, then Open is called
- Given an OPEN round with ends_at <= now, when Tick runs, then Close is called
- Given times in the future, when Tick runs, then nothing is called


## Scope
- In scope: backend/internal/round/scheduler.go
- Out of scope: process wiring
- Preserve: Service API


## Technical constraints
- Clock interface {Now() time.Time}


## Dependencies
- R2


## Definition of done
- Scheduler compiles


## Non-functional requirements
- Run stops on context cancel


## Clarifying questions
- None
