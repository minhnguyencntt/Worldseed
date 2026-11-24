---
id: "01M84F6TVFM92WZ5NK76MMTJKG"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-7.1 · Add the worker Go module with config, logger, file lock and JSON store

Context: no worker module exists in the workspace (the repo holds only backend/, game/ and context.md). SG-7 needs a foundation for the execution runner. Desired behavior: a separate Go module at backend/worker with a YAML config loader, a JSON structured logger, an exclusive file lock and a JSON execution store. Expected result: each piece builds and has unit-testable behavior. Why: the runner can then be built on top of these primitives.

## Acceptance criteria
- Given a YAML file, when worker config LoadFS runs, then defaults are filled and STORYFORGE_WORKER_* env values override YAML values
- Given a logger built with a level, when a record is logged, then one JSON line is written containing msg and level
- Given a held lock file, when a second Acquire runs on the same path, then it fails with ErrLocked until Release is called
- Given an execution, when Save then Get run on the store, then the same record is returned and unsafe ids are rejected


## Scope
- In scope: backend/worker module with go.mod
- In scope: config loader
- In scope: slog JSON logger
- In scope: file lock
- In scope: JSON execution store
- Out of scope: runner, providers, poller and git operations
- Out of scope: changes to the backend module
- Preserve: existing backend module and its tests


## Technical constraints
- Go, YAML via gopkg.in/yaml.v3, stdlib log/slog
- No database; state is JSON files on the local filesystem
- Module path github.com/worldseed/storyforge/worker


## Definition of done
- All four packages build with go build ./... inside backend/worker


## Non-functional requirements
- Execution ids are path-traversal safe


## Clarifying questions
- None
