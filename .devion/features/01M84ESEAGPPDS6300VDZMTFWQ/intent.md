---
id: "01M84ESEAGPPDS6300VDZMTFWQ"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-7 · Build worker execution engine

Context: the repository has a Go backend (backend/internal/round, execution, gitrepo) but no worker module; the top level holds backend/, game/ and context.md. Desired behavior: a new Go module in worker/ provides config loading, structured logging, a file-based per-World lock, JSON execution records, startup recovery, Git-polled Round detection with expiry closing and snapshot freezing, isolated worktree executions with timeout, retry, budget and an approval gate, a coding-agent provider interface with mock and Claude Code CLI adapters, and structured reports. Expected result: every behavior is covered by unit tests with mocked Git, provider and clock. Why: the Worker must survive restarts and never publish unreviewed or partially built work.

## Acceptance criteria
- Given a worker YAML file, when config is loaded, then values and defaults are returned and invalid values are rejected, and a JSON slog logger is available
- Given one World lock held, when a second execution tries to acquire it, then it fails with ErrLocked; after release it succeeds
- Given RUNNING or QUEUED execution records at startup, when recovery runs, then each is resumed (QUEUED) or marked RECOVERING and stale locks are released
- Given OPEN and SCHEDULED Rounds from the mocked Git interface, when polling at a fake time past EndsAt, then the expired Round is closed with an immutable snapshot.yaml whose format matches backend round.Snapshot
- Given an execution, when it runs, then it uses an isolated worktree, honors timeout, retries up to the limit, stops at the budget, and blocks at AWAITING_APPROVAL until approved
- Given the mock provider and Claude CLI adapter, when run, then the adapter passes community text as data over stdin with an argument slice (no shell) and restricted permissions, and structured reports are written under development/executions


## Scope
- In scope: worker/ Go module with internal packages config, logging, lock, state, recovery, rounds, runner, provider
- Out of scope: Analyzer/planner/publisher/next-round pipeline stages
- Out of scope: backend and game changes
- Out of scope: Real network, Git remotes or Claude invocation in tests
- Preserve: backend module and its round.yaml, snapshot.yaml and execution YAML formats


## Technical constraints
- Go 1.22, gopkg.in/yaml.v3 only external dependency, no database or queue
- Community text must never be shell-interpolated or used as system instructions


## Dependencies
- backend/internal/round/snapshot.go snapshot format
- backend/internal/gitrepo Committer semantics


## Definition of done
- All requirements have Act and Verify units merged
- go test ./... passes in worker/


## Non-functional requirements
- Atomic file writes for state and reports


## Clarifying questions
- None
