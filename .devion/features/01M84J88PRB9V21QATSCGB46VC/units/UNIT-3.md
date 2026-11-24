---
id: "01M84J88PST3Y8RS3ZF1HJJC6P"
kind: unit
parent: 01M84J88PSFZV9F5DHJKTJMV0T
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Remove execution type and functions from the API client

client.ts: remove ExecutionInfo, approveExecution, retryExecution, rejectExecution, listExecutions, findExecutionForRound, getCurrentRoundExecution.

## Acceptance criteria
- client.ts exports no execution symbol
- getCurrentRound and other round functions remain


## Scope
- In scope: client.ts
- Out of scope: AdminApp
- Preserve: adminRequest, round, world, contribution, player functions


## Technical constraints
- Run after AdminApp no longer imports these
- Code path: `game/frontend/src/api/client.ts`


## Dependencies
- act2


## Definition of done
- No execution code in client.ts


## Clarifying questions
- None
