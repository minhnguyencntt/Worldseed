---
id: "01M84H6WGG8P8Z5HH6D00V6QX9"
kind: unit
parent: 01M84H6WGGZ6QAD267HECPGFSD
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Claude fixed prompt and empty workDir unit tests

Add two tests to claude_test.go using recordingExec.

## Acceptance criteria
- Empty workDir errors without Exec call
- Arg after -p equals claudePrompt and no arg contains the workDir


## Scope
- In scope: claude_test.go
- Out of scope: product code
- Preserve: existing tests


## Technical constraints
- Fake Exec only


## Definition of done
- Tests pass


## Clarifying questions
- None
