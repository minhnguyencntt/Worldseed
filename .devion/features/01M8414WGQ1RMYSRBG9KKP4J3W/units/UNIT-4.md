---
id: "01M8414WGSCHK40XTRCR8BKCX3"
kind: unit
parent: 01M8414WGR95TW52K6WTH930EK
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Scaffold worker Go module and YAML config

Context: No worker sources exist; root go.mod exists after ACT-BE.
Desired behavior: Add worker YAML config fields required by REQ-WORKER and a stub that only loads config.
Expected result: Worker configures paths/commands without invoking Claude CLI.
Why: Implements REQ-WORKER product code only.

## Acceptance criteria
- Given Act complete, when inspecting the root, then worker.go, worker_config.go, and worker.config.example.yaml exist.
- Given example-shaped YAML, when LoadWorkerFS reads it, then RepoPath, WorktreeDir, Agent.Command, and Execution.TimeoutSeconds populate.


## Scope
- In scope: Worker YAML LoadWorkerFS
- In scope: example config
- In scope: stub worker mode in main
- Out of scope: Pipeline stages
- Out of scope: CLI invocation
- Out of scope: *_test.go
- Out of scope: Nested worker/ directory
- Preserve: No secrets in example config


## Technical constraints
- Go + YAML in root module
- LoadWorkerFS must use fs.FS
- New file: `worker_config.go`
- New file: `worker.go`
- New file: `worker.config.example.yaml`
- New file: `main.go`


## Dependencies
- REQ-WORKER
- ACT-BE


## Definition of done
- All code_paths created
- No test files added by this Act


## Clarifying questions
- None
