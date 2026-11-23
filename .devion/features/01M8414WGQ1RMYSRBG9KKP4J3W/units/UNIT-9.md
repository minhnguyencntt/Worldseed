---
id: "01M8414WGSSF8FJPDP6VFWX3Q5"
kind: unit
parent: 01M8414WGR95TW52K6WTH930EK
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Worker config LoadFS unit tests

Context: ACT-WORKER added LoadWorkerFS without tests.
Desired behavior: Prove success path and validation errors with fstest.MapFS only.
Expected result: Filtered go test for worker config passes.
Why: Maps REQ-WORKER config ACs to unit evidence.

## Acceptance criteria
- Given valid MapFS YAML, when LoadWorkerFS runs, then RepoPath ., WorktreeDir .worktrees, Agent.Command claude, TimeoutSeconds 3600.
- Given YAML with timeout_seconds 0, when LoadWorkerFS runs, then it returns an error.


## Scope
- In scope: worker_config_test.go
- Out of scope: Executing claude CLI
- Out of scope: Worktree creation
- Preserve: LoadWorkerFS behavior from ACT-WORKER


## Technical constraints
- Mock filesystem via testing/fstest only
- No child processes


## Dependencies
- ACT-WORKER


## Definition of done
- worker_config_test.go exists and filtered go test passes


## Clarifying questions
- None
