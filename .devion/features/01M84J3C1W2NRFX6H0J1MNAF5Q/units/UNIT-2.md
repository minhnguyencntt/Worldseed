---
id: "01M84J3C1XHXENKDG0JZNEVTE7"
kind: unit
parent: 01M84J3C1WXF0M78N4FY6G8SYY
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Confirm cmd/server/main.go reads only kept config fields

Read main.go and confirm it only calls config.Load, server.NewScheduler(cfg), server.New(cfg, logger) and reads cfg.Server.Addr. Remove any worker wiring found; none is expected.

## Acceptance criteria
- main.go has no worker or execution reference
- main.go builds


## Scope
- In scope: backend/cmd/server/main.go
- Out of scope: Test files
- Preserve: Scheduler start and graceful shutdown


## Technical constraints
- Code path: `backend/cmd/server/main.go`


## Definition of done
- main.go compiles with no worker or execution reference


## Clarifying questions
- None
