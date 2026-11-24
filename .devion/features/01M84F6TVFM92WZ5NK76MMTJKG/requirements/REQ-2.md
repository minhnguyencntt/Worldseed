---
id: "01M84F6TVF51QHAYQEF92ECA62"
kind: requirement
parent: 01M84F6TVFM92WZ5NK76MMTJKG
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Worker writes structured JSON logs at a configured level

Context: backend uses slog.NewJSONHandler inline in cmd/server/main.go; the worker needs a reusable factory. Desired behavior: logging.New(w, level) returns a JSON slog logger. Expected result: parseable log lines filtered by level. Why: execution reports need structured logs.

## Acceptance criteria
- Given level info, when Info is logged, then one JSON line with msg and level INFO is written
- Given level warn, when Info is logged, then nothing is written
- Given an unknown level string, when New runs, then it returns an error


## Scope
- In scope: logging package
- Out of scope: log file rotation
- Preserve: backend logging


## Technical constraints
- stdlib log/slog only


## Dependencies
- R1 module go.mod


## Definition of done
- logging package builds


## Clarifying questions
- None
