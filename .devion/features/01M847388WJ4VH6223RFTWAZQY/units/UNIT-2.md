---
id: "01M847388XQTT5GAN8VR1KJQ5T"
kind: unit
parent: 01M847388WCYP1TSR5X4DBT638
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Confirm scheduler construction and start in main

Read server.NewScheduler and cmd/server/main.go and confirm the scheduler is built from cfg and run in a goroutine with the signal context.

## Acceptance criteria
- NewScheduler sets Controller, Rounds, Worlds and Interval
- main calls go server.NewScheduler(cfg).Run(ctx)


## Scope
- In scope: backend/internal/server/server.go
- In scope: backend/cmd/server/main.go
- Out of scope: Scheduler.Tick
- Preserve: Shutdown handling


## Technical constraints
- Run takes the NotifyContext ctx
- Code path: `backend/internal/server/server.go`
- Code path: `backend/cmd/server/main.go`


## Definition of done
- Scheduler wired; build passes


## Clarifying questions
- None
