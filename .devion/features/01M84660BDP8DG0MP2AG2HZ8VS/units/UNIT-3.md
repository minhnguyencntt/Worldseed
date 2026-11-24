---
id: "01M84660BF3FZWYGY1HZPHDANS"
kind: unit
parent: 01M84660BEXQG4BYA5BVZ1P4KE
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Implement round Scheduler with injected Clock

Scheduler iterates worlds, lists rounds and calls the lifecycle controller.

## Acceptance criteria
- Tick returns the first error but continues other rounds
- Run ticks every Interval until ctx is done


## Scope
- In scope: backend/internal/round/scheduler.go
- Out of scope: main.go


## Technical constraints
- Controller interface {Open(ctx,world,id,OpenOptions)(Round,error); Close(ctx,world,id)(Round,error)}
- New file: `backend/internal/round/scheduler.go`


## Dependencies
- R3
- A2


## Definition of done
- go build ./internal/round


## Clarifying questions
- None
