---
id: "01M84FKWSG2WRRFAR7BRHRDNYH"
kind: unit
parent: 01M84FKWSFS93QQC1M4G0P5A4N
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Runner lock, worktree and timeout unit tests

Write runner_test.go with fake Agent, Worktrees and Publisher plus a temp dir for lock and store, proving Act A1 against R1 criteria.

## Acceptance criteria
- Locked, cleanup and timeout cases each have a passing test
- Tests use only fakes and t.TempDir


## Scope
- In scope: runner_test.go
- Out of scope: real git or agent
- Preserve: product code


## Technical constraints
- fake Agent counts calls and records workDir; fake Worktrees records Create and Remove


## Dependencies
- A1


## Definition of done
- go test ./internal/runner -run 'TestRun(Locked|Cleanup|Timeout)' passes


## Clarifying questions
- None
