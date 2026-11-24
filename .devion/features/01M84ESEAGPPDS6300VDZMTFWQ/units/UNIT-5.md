---
id: "01M84ESEAH3704GRR8SHEB8YGZ"
kind: unit
parent: 01M84ESEAHBWH8RE5PX59GVS0P
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Implement the mock provider and Claude Code CLI adapter

Implement provider package with no tests.

## Acceptance criteria
- Mock and Claude implement Run(ctx, workDir, prompt)
- Claude never puts prompt text into argv


## Scope
- In scope: provider package
- Out of scope: tests
- Preserve: none


## Technical constraints
- Argv built as []string, prompt on stdin


## Definition of done
- go build ./... passes


## Clarifying questions
- None
