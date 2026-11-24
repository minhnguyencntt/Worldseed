---
id: "01M84J3C1W2NRFX6H0J1MNAF5Q"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-3 · Remove worker config keys

Context: the worker module and execution backend were deleted in earlier sub-goals. Desired behavior: backend/internal/config, backend/configs/config.example.yaml and backend/cmd/server/main.go hold no worker or execution settings, and config tests match. Expected result: loading still works for the remaining keys (server, auth, git, hosting, storage, contribution, admin, round) and no code reads a removed key. Why: development automation must not live in this repo. Reading the repo shows config.go, config.example.yaml and main.go already contain no worker keys, so the work is to confirm this and lock it with tests.

## Acceptance criteria
- Given backend/internal/config/config.go, when Config and its nested structs are inspected, then no worker, execution, work root, budget, auto-publish or agent-provider field exists
- Given backend/configs/config.example.yaml, when it is parsed, then it has no worker or execution top-level key
- Given a minimal YAML with only auth.token_secret, when LoadFS runs, then it succeeds and the contribution, round and storage defaults are applied
- Given backend/cmd/server/main.go, when it is read, then it only uses config.Load, cfg.Server.Addr, server.NewScheduler and server.New


## Scope
- In scope: backend/internal/config/config.go
- In scope: backend/internal/config/config_test.go
- In scope: backend/configs/config.example.yaml
- In scope: backend/cmd/server/main.go
- Out of scope: game/
- Out of scope: backend/internal/contribution
- Out of scope: frontend code
- Out of scope: docs
- Preserve: Existing env overrides STORYFORGE_*
- Preserve: Defaults for contribution, round, storage and auth
- Preserve: hosting.provider key, which is the git hosting provider and not an agent provider


## Technical constraints
- Go module under backend/; tests are unit tests using testing/fstest


## Definition of done
- All slices below are implemented and verified by unit tests


## Clarifying questions
- None
