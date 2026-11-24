---
id: "01M84ESEAGQ9G23D8MDBBA29HQ"
kind: requirement
parent: 01M84ESEAGPPDS6300VDZMTFWQ
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Worker loads config, logs structured JSON and enforces a per-World file lock

Context: no worker module exists. Desired behavior: config.LoadFS reads a worker YAML (world, repo_path, work_root, poll_interval, exec_timeout, max_retries, max_budget_usd, auto_publish, provider) with defaults and validation, logging.New builds a JSON slog logger, and lock.Acquire gives one development execution per World. Expected result: a second acquire fails until release. Why: prevents concurrent executions on one World.

## Acceptance criteria
- Given a YAML missing optional fields, when loaded, then defaults apply (poll_interval 30s, exec_timeout 30m, max_retries 2, auto_publish false)
- Given an empty world, non-positive timeout or negative budget, when loaded, then an error names the field
- Given a held lock for a World, when Acquire is called again, then ErrLocked is returned
- Given a released lock, when Acquire is called, then it succeeds and the lock file contains the owner


## Scope
- In scope: worker/go.mod
- In scope: worker/internal/config
- In scope: worker/internal/logging
- In scope: worker/internal/lock
- Out of scope: Recovery of stale locks
- Preserve: backend config style (LoadFS, yaml.v3)


## Technical constraints
- Lock via os.OpenFile O_CREATE|O_EXCL, no flock dependency


## Definition of done
- Config, logger and lock packages compile and behave as specified


## Non-functional requirements
- Lock file removal only by its owner


## Clarifying questions
- None
