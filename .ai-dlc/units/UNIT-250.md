# UNIT-250 — Act: Remove execution type and functions from the API client

## Summary
Delete ExecutionInfo and all execution client functions from client.ts

## Description
client.ts: remove ExecutionInfo, approveExecution, retryExecution, rejectExecution, listExecutions, findExecutionForRound, getCurrentRoundExecution.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/api/client.ts` · `ExecutionInfo` · L26-L36
- **Do:** Delete the ExecutionInfo interface and its doc comment
- **Expected:** Type gone

### Step 2 — `game/frontend/src/api/client.ts` · `approveExecution, retryExecution, rejectExecution, listExecutions, findExecutionForRound, getCurrentRoundExecution` · L106-L152
- **Do:** Delete these seven declarations with their doc comments; keep createRound, listRoundContributions above and BASE_URL below
- **Expected:** No execution symbol remains

## Acceptance criteria
- client.ts exports no execution symbol
- getCurrentRound and other round functions remain

## Definition of done
- No execution code in client.ts
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-250.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-049
- Requirement: REQ-126
- Unit (Act): UNIT-250
- Unit (Verify): UNIT-253
- Status: completed
- Change: UPDATE
