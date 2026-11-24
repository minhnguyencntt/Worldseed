---
id: "01M8485RN2NVQSWFJJ1J1P8CPG"
kind: unit
parent: 01M8485RN28YNNDCHAR9WMG6YV
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add the current-Round ExecutionInfo lookup

Add a pure filter helper and an async wrapper in client.ts that uses getCurrentRound and listExecutions.

## Acceptance criteria
- findExecutionForRound returns the newest matching execution or undefined
- getCurrentRoundExecution resolves the current round id then returns its execution


## Scope
- In scope: client.ts
- Out of scope: Tests
- Out of scope: UI
- Preserve: getCurrentRound


## Technical constraints
- Depends on listExecutions from ACT1
- Code path: `game/frontend/src/api/client.ts`


## Dependencies
- ACT1


## Definition of done
- Both functions exported and type-check


## Clarifying questions
- None
