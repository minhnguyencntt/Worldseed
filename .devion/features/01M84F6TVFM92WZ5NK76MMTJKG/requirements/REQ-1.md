---
id: "01M84F6TVFWRY2G8X3YK66MN9C"
kind: requirement
parent: 01M84F6TVFM92WZ5NK76MMTJKG
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Worker module loads YAML config with defaults and env overrides

Context: backend/internal/config/config.go has the LoadFS(fsys, name, getenv) pattern; the worker has none. Desired behavior: backend/worker module exposes config.LoadFS with the same shape. Expected result: a validated Config for the worker. Why: the runner needs configured paths and timeouts.

## Acceptance criteria
- Given a YAML file with only worker.repo_path, when LoadFS runs, then PollInterval is 30s, ExecutionTimeout is 30m, MaxRetries is 2 and Store.Dir is .storyforge/executions
- Given STORYFORGE_WORKER_REPO_PATH is set, when LoadFS runs, then it overrides the YAML repo_path
- Given an empty repo_path after env overrides, when LoadFS runs, then it returns an error


## Scope
- In scope: backend/worker/go.mod
- In scope: config package
- In scope: config.example.yaml
- Out of scope: runner wiring
- Preserve: backend/internal/config unchanged


## Technical constraints
- Mirror the LoadFS(fsys fs.FS, name string, getenv func(string) string) signature of the backend config


## Definition of done
- config package builds and example YAML parses


## Clarifying questions
- None
