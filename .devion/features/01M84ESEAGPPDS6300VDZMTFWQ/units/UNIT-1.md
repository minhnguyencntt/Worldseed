---
id: "01M84ESEAH3X3530THG21X2057"
kind: unit
parent: 01M84ESEAGQ9G23D8MDBBA29HQ
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Create worker module with config, logging and file lock

Create the module and three small packages following backend/internal/config conventions. Desired behavior as in the requirement; no tests here.

## Acceptance criteria
- config.LoadFS(fsys, name) returns a Config with defaults and validation errors
- logging.New(level, w) returns a *slog.Logger writing JSON
- lock.Acquire(path, owner) returns *Lock or ErrLocked and Release removes the file only for the owner


## Scope
- In scope: worker/go.mod
- In scope: worker/go.sum
- In scope: config, logging, lock packages
- Out of scope: tests
- Preserve: backend module untouched


## Technical constraints
- module github.com/worldseed/storyforge/worker, go 1.22


## Definition of done
- go build ./... succeeds in worker/


## Clarifying questions
- None
