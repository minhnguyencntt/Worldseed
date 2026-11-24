---
id: "01M846R0M8WWVYMEXEPXS480ZC"
kind: unit
parent: 01M846R0M8HFZ1BM55EJHAMCC3
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Mount admin round routes and expose the scheduler

In server.New build round.FileStore, round.Service and admin.RoundHandler and mount five round routes under the admin group. Expose a NewScheduler builder and start it from main.

## Acceptance criteria
- Five routes mounted behind token
- Scheduler runs in main with cfg.Round.SchedulerInterval


## Scope
- In scope: server.go
- In scope: main.go
- Out of scope: UI
- Preserve: execution routes


## Technical constraints
- Use existing gitCLI and contribution store
- Code path: `backend/internal/server/server.go`
- Code path: `backend/cmd/server/main.go`


## Definition of done
- go build ./... succeeds


## Clarifying questions
- None
