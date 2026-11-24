---
id: "01M84FWVJ6XD15NX7X23SKWWMV"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-7.4 · Write a structured execution report after each worker run

Context: backend/worker/internal/runner.Runner.Run persists only a store.Execution record under .storyforge/executions and writes no report. Desired behavior: after every run that took the lock, a JSON report is written to development/executions/<id>.json. Success, failure and awaiting-approval all produce one. The ID is validated by the same rule as store.Store. Expected result: reviewable, committed execution summaries. Why: the product requires persisted structured execution reports.

## Acceptance criteria
- Given a run that fails, succeeds or awaits approval, When Run returns, Then <ReportDir>/<id>.json exists with the final status
- Given an execution ID such as ../evil, When a report is written, Then it is rejected with store.ErrInvalidID and no file is created outside ReportDir


## Scope
- In scope: Export of the store ID validator
- In scope: New report writer package
- In scope: Runner integration
- Out of scope: Git commit of reports
- Out of scope: Admin UI changes
- Out of scope: Worker config file fields
- Preserve: store.Store behavior and JSON format
- Preserve: Runner.New signature
- Preserve: Existing runner tests


## Technical constraints
- Go 1.22, module github.com/worldseed/storyforge/worker
- No database; plain JSON files written atomically
- Same ID rule as store.idPattern


## Definition of done
- All three requirements implemented and verified by unit tests


## Non-functional requirements
- Atomic writes via temp file and rename


## Clarifying questions
- None
