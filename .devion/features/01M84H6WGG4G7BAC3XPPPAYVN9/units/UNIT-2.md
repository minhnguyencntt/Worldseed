---
id: "01M84H6WGGBP2T02K4B55JNVGY"
kind: unit
parent: 01M84H6WGGZ6QAD267HECPGFSD
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Validate workDir in Claude.Run before executing

Add a guard at the top of Claude.Run using strings.TrimSpace.

## Acceptance criteria
- Empty or whitespace workDir returns an error containing work dir
- Exec is not called in that case


## Scope
- In scope: claude.go
- Out of scope: tests
- Preserve: Exec failure wrapping


## Technical constraints
- Error prefix 'provider claude:'
- Code path: `backend/worker/internal/provider/claude.go`


## Dependencies
- ACT1


## Definition of done
- Guard present


## Clarifying questions
- None
