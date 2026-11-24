---
id: "01M8485RN28YNNDCHAR9WMG6YV"
kind: requirement
parent: 01M8485RN179N4RYZ1YB7BYKKP
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Lookup returns the ExecutionInfo for the current Round

Context: Executions carry round_id; the public current Round comes from getCurrentRound. Desired behavior: a pure findExecutionForRound(list, roundId) and an async getCurrentRoundExecution(token, worldId) that composes them. Expected result: the matching ExecutionInfo, newest by updated_at when several match, else undefined. Why: the admin console shows the current Round's execution.

## Acceptance criteria
- Given executions for round-1 and round-2 and current round round-1, when getCurrentRoundExecution runs, then the round-1 execution is returned
- Given no execution for the current round, when it runs, then undefined is returned
- Given two executions for the current round, when it runs, then the one with the later updated_at is returned


## Scope
- In scope: findExecutionForRound
- In scope: getCurrentRoundExecution
- Out of scope: UI wiring
- Preserve: getCurrentRound behavior


## Technical constraints
- updated_at is RFC 3339 so string comparison orders it


## Definition of done
- Both functions exported


## Clarifying questions
- None
