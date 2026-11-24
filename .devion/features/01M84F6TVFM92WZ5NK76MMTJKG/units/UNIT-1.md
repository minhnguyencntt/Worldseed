---
id: "01M84F6TVF88Z7HGQKDJ9BWR6J"
kind: unit
parent: 01M84F6TVFWRY2G8X3YK66MN9C
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Create worker module and config loader

Create the module and the config LoadFS mirroring backend/internal/config/config.go.

## Acceptance criteria
- config.LoadFS fills defaults and applies env overrides
- Empty repo_path returns an error


## Scope
- In scope: backend/worker/go.mod
- In scope: backend/worker/internal/config/config.go
- In scope: backend/worker/configs/config.example.yaml
- Out of scope: tests
- Preserve: backend module


## Technical constraints
- go 1.22, yaml.v3 v3.0.1
- New file: `backend/worker/go.mod`
- New file: `backend/worker/go.sum`
- New file: `backend/worker/internal/config/config.go`
- New file: `backend/worker/configs/config.example.yaml`


## Definition of done
- go build ./... passes in backend/worker


## Clarifying questions
- None
