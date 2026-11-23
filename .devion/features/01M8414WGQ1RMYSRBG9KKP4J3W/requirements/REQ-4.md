---
id: "01M8414WGR95TW52K6WTH930EK"
kind: requirement
parent: 01M8414WGQ1RMYSRBG9KKP4J3W
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Local Worker Go module with YAML config

Context: No worker sources exist.
Desired behavior: Root Go module loads worker YAML config (repo path, worktree dir, agent command, execution timeout) via `fs.FS`, with example config and a stub path that loads config then exits successfully when given a path.
Expected result: Worker can be configured without live Claude CLI or network in Phase-1.
Why: Isolates Local Worker concerns for later pipeline phases.

## Acceptance criteria
- Given the repository after this requirement, when inspecting the root, then `worker_config.go`, `worker.go`, and `worker.config.example.yaml` exist alongside `go.mod`.
- Given YAML with `repo_path: "."`, `worktree_dir: ".worktrees"`, `agent.command: "claude"`, and `execution.timeout_seconds: 3600`, when `LoadWorkerFS` reads it, then those fields populate the WorkerConfig struct.
- Given the example worker config file, when opened, then it includes keys for repo_path, worktree_dir, agent.command, and execution.timeout_seconds.


## Scope
- In scope: Worker YAML config load via fs.FS
- In scope: Example worker YAML config
- In scope: Stub worker entry that loads config
- Out of scope: Round polling, analysis, Claude Code invocation, publish pipeline
- Out of scope: Separate worker/ Go module directory
- Preserve: No secrets committed — example config only


## Technical constraints
- Mandatory: Go worker code in the root Go module
- Mandatory: YAML configuration; filesystem-based config suitable for later lock/execution state


## Dependencies
- INT-SG1


## Definition of done
- Worker config and stub exist in root Go module
- Linked Act and Verify units complete


## Non-functional requirements
- Config load must not invoke external processes


## Clarifying questions
- None
