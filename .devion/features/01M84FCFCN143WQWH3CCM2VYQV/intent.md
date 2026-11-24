---
id: "01M84FCFCN143WQWH3CCM2VYQV"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-7.2 · Extend the worker config with work root, budget, auto-publish and provider kind

Context: backend/worker/internal/config/config.go already loads worker.world_id, repo_path, poll_interval, execution_timeout and max_retries with defaults and env overrides. Desired behavior: add the work root, maximum budget, auto-publish flag and provider kind, and validate these together with the existing timeout and max retries. Expected result: LoadFS returns a fully defaulted, validated Config or a field-naming error. Why: the execution engine needs these controls before it can run supervised, budgeted executions.

## Acceptance criteria
- Given a YAML with only worker.repo_path, when LoadFS runs, then WorkRoot, MaxBudget, AutoPublish and ProviderKind hold documented defaults
- Given an invalid timeout, retries, budget or provider kind, when LoadFS runs, then it returns a nil config and an error naming the field


## Scope
- In scope: backend/worker/internal/config/config.go
- In scope: backend/worker/configs/config.example.yaml
- Out of scope: Using the new fields in the runner or providers
- Out of scope: Backend and frontend config
- Preserve: Existing defaults for poll_interval, execution_timeout, max_retries, log and store
- Preserve: Existing repo_path validation and env overrides


## Technical constraints
- Go, gopkg.in/yaml.v3, no new dependencies
- Auto-publish default false (supervised publishing)


## Definition of done
- Config fields, defaults and validation implemented
- Example YAML documents the new keys


## Clarifying questions
- None
