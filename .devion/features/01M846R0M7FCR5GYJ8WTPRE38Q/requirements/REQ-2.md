---
id: "01M846R0M8HFZ1BM55EJHAMCC3"
kind: requirement
parent: 01M846R0M7FCR5GYJ8WTPRE38Q
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Admin round routes mounted and scheduler started in the server

Context: server.New mounts only execution routes under /api/v1/admin. Desired: also mount POST /rounds, POST /rounds/{id}/open, POST /rounds/{id}/close, GET /rounds/{id}, GET /rounds/{id}/contributions using round.Service built from round.FileStore, gitCLI and contribution store; main starts round.Scheduler with cfg.Round.SchedulerInterval.

## Acceptance criteria
- Given admin token tok, when each of the five round endpoints is requested with Bearer tok, then status is not 404
- Given no Authorization header, when a round endpoint is requested, then status is 401
- Given cfg.Round.SchedulerInterval, when the scheduler is built, then its Interval equals that value and Worlds lists world IDs from world.Repo


## Scope
- In scope: internal/server/server.go
- In scope: cmd/server/main.go
- Out of scope: frontend admin UI
- Preserve: execution routes
- Preserve: player and contribution routes


## Technical constraints
- Round files live under cfg.Storage.RepoPath


## Dependencies
- R1


## Definition of done
- TestNew_AdminRoundsAreMounted passes


## Non-functional requirements
- Scheduler stops when the process context is cancelled


## Clarifying questions
- None
