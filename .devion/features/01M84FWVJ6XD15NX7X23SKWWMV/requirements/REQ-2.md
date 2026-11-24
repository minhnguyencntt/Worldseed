---
id: "01M84FWVJ69CE912Y959GVB0FZ"
kind: requirement
parent: 01M84FWVJ6XD15NX7X23SKWWMV
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · A report writer persists validated, atomically written JSON reports

Context: no report package exists. Desired behavior: report.Writer{dir}.Write(Report) validates ID with store.ValidateID, creates the directory, and atomically writes indented JSON containing execution id, round id, status, attempts, error, started_at, finished_at and duration_ms. Expected result: a structured file per execution. Why: persisted execution summaries.

## Acceptance criteria
- Given a valid Report, When Write is called, Then <dir>/<id>.json decodes to the same field values
- Given an invalid ID, When Write is called, Then it returns an error wrapping store.ErrInvalidID and the directory has no files


## Scope
- In scope: backend/worker/internal/report/report.go
- Out of scope: Runner wiring
- Preserve: store package API


## Technical constraints
- Atomic temp file then rename like store.Save


## Dependencies
- req1


## Definition of done
- Writer implemented


## Non-functional requirements
- Atomic write


## Clarifying questions
- None
