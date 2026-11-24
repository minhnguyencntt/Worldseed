---
id: "01M84H6WGGJ99YEVWBZ3REYK9A"
kind: unit
parent: 01M84H6WGGV2NNFWP0JQH0SHK1
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Claude restricted-permission flag unit tests

Add tests to claude_test.go using the existing recordingExec.

## Acceptance criteria
- Args contain --permission-mode acceptEdits
- Bash is denied and not allowed


## Scope
- In scope: claude_test.go
- Out of scope: product code
- Preserve: existing tests


## Technical constraints
- Fake Exec only; no real claude process


## Definition of done
- Tests pass


## Clarifying questions
- None
