---
id: "01M84H1K6H323YK86JCABWX7TS"
kind: unit
parent: 01M84H1K6GNBDDT99CHEFB2VQM
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Implement the Claude CLI adapter

Create backend/worker/internal/provider/claude.go with Exec, Claude, NewClaude and Run that calls Exec with fixed args.

## Acceptance criteria
- Claude.Run calls Exec with name claude and constant args
- Exec errors are wrapped


## Scope
- In scope: claude.go
- Out of scope: tests
- Out of scope: a real Exec
- Preserve: runner.Agent


## Technical constraints
- No shell
- No player text in args
- New file: `backend/worker/internal/provider/claude.go`


## Dependencies
- R2


## Definition of done
- package compiles


## Clarifying questions
- None
