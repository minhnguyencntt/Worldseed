---
id: "01M84ESEAHN6P1E1SV110MR099"
kind: requirement
parent: 01M84ESEAGPPDS6300VDZMTFWQ
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Executions persist as JSON records and startup recovery resumes or marks unfinished ones

Context: backend execution records are YAML; the worker keeps its own local JSON state. Desired behavior: state.Store saves and loads one JSON file per execution atomically; recovery.Run scans for unfinished executions and releases stale locks. Expected result: after a crash nothing is assumed to be running. Why: the Worker is not continuously running.

## Acceptance criteria
- Given a saved Execution, when loaded, then all fields round-trip
- Given a RUNNING execution with Attempt below max retries, when recovery runs, then it becomes QUEUED (resumed) with an Error note
- Given a RUNNING execution with Attempt at max retries, when recovery runs, then it becomes RECOVERING
- Given a stale lock owned by a dead process, when recovery runs, then the lock is removed; AWAITING_APPROVAL and COMPLETED records are untouched


## Scope
- In scope: worker/internal/state
- In scope: worker/internal/recovery
- Out of scope: Running the executions
- Preserve: Status names from backend execution package


## Technical constraints
- Atomic write via temp file and rename; clock and process-liveness injected


## Dependencies
- R1 lock package


## Definition of done
- Store and recovery behave as specified


## Non-functional requirements
- Safe IDs only (no path traversal)


## Clarifying questions
- None
