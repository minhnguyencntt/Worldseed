---
id: "01M84H1K6HJNG4VKMV5SR0K6PF"
kind: unit
parent: 01M84H1K6GQA0WZXF8MD33507X
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Implement the labelled Mock agent

Create backend/worker/internal/provider/mock.go with type Mock and Run that honours ctx and writes the marker file.

## Acceptance criteria
- Mock.Run writes MOCK-EXECUTION.md containing MOCK in workDir
- Mock.Run returns cost 0 and a nil error on success


## Scope
- In scope: mock.go
- Out of scope: tests
- Preserve: runner.Agent


## Technical constraints
- Standard library only
- New file: `backend/worker/internal/provider/mock.go`


## Dependencies
- R1


## Definition of done
- package compiles with go build ./internal/provider


## Clarifying questions
- None
