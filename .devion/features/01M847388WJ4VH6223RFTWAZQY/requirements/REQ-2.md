---
id: "01M847388WCYP1TSR5X4DBT638"
kind: requirement
parent: 01M847388WJ4VH6223RFTWAZQY
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Scheduler is built from config and started in main

Context: server.NewScheduler wires round.Service, round.FileStore, a world lister and cfg.Round.SchedulerInterval; main.go launches it with go Run(ctx). Desired behavior: scheduler is constructed from config with controller and store set. Expected result: NewScheduler returns a scheduler with the configured interval. Why: rounds must open and close automatically.

## Acceptance criteria
- Given round.scheduler_interval 7s, when NewScheduler is built, then Interval is 7s
- Given a temp repo_path, when NewScheduler is built, then Controller and Rounds are non-nil


## Scope
- In scope: server.NewScheduler
- In scope: main.go scheduler start
- Out of scope: Scheduler tick logic
- Preserve: Graceful shutdown on interrupt


## Technical constraints
- Scheduler uses the injected config only


## Definition of done
- NewScheduler wired and started in main


## Clarifying questions
- None
