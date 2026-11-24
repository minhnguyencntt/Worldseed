---
id: "01M84F6TVGYPGYQXCCVV3CFTR1"
kind: unit
parent: 01M84F6TVF51QHAYQEF92ECA62
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add the JSON slog logger factory

Implement the logger factory used by the worker.

## Acceptance criteria
- New returns a JSON logger for debug, info, warn, error
- Unknown level returns an error


## Scope
- In scope: backend/worker/internal/logging/logging.go
- Out of scope: tests


## Technical constraints
- log/slog only
- New file: `backend/worker/internal/logging/logging.go`


## Definition of done
- package builds


## Clarifying questions
- None
