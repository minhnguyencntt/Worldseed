---
id: "01M84H6WGGK6TDD4EG8GQGEE0A"
kind: unit
parent: 01M84H6WGGV2NNFWP0JQH0SHK1
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add restricted-permission flags to Claude.Run

Replace the inline []string{"-p", claudePrompt} in Claude.Run with a package-level builder claudeArgs() returning flags that restrict the CLI.

## Acceptance criteria
- Run passes --permission-mode acceptEdits
- Run passes --disallowedTools Bash,WebFetch,WebSearch and an --allowedTools list without Bash


## Scope
- In scope: claude.go
- Out of scope: tests
- Preserve: claudePrompt constant


## Technical constraints
- Args are a slice
- Code path: `backend/worker/internal/provider/claude.go`


## Definition of done
- Run uses claudeArgs()


## Clarifying questions
- None
