---
id: "01M84H1K6HM0NCH32W6HWET525"
kind: unit
parent: 01M84H1K6GNBDDT99CHEFB2VQM
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Claude adapter unit tests with a fake Exec

Use a fake Exec recording its call.

## Acceptance criteria
- Exec receives dir, name claude and non-empty args
- Exec error is wrapped
- nil Exec is rejected


## Scope
- In scope: claude_test.go
- Out of scope: product code


## Technical constraints
- No real process
- New file: `backend/worker/internal/provider/claude_test.go`


## Dependencies
- A2


## Definition of done
- tests pass


## Clarifying questions
- None
