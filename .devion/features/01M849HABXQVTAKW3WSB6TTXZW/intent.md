---
id: "01M849HABXQVTAKW3WSB6TTXZW"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-6.4.3 · Wire approve, retry and reject handlers into AdminApp's ExecutionPanel

Context: ExecutionPanel already accepts onApprove, onRetry, onReject and actionError, and api/client.ts already exports approveExecution, retryExecution and rejectExecution. AdminApp.tsx renders ExecutionPanel with only execution and contributionCount. Desired behavior: each handler calls the matching client function for the current execution, reloads the data, and shows an error on failure. Expected result: admin can approve, retry or reject from the panel. Why: finish SG-6.4 wiring.

## Acceptance criteria
- Given an AWAITING_APPROVAL execution, when Approve or Reject is clicked, then the matching POST is sent with the bearer token and the data reloads
- Given a FAILED execution, when Retry is clicked, then the retry POST is sent and the data reloads
- Given an action fails with a non-401 error, when it completes, then the panel shows the message or 'Request failed' and a 401 returns to the token gate


## Scope
- In scope: game/frontend/src/components/AdminApp.tsx
- Out of scope: Backend changes
- Out of scope: ExecutionPanel changes
- Out of scope: client.ts changes
- Preserve: Existing round open/close behavior
- Preserve: Existing 401 handling in handleError


## Technical constraints
- tsc --noEmit must pass with no duplicate declarations
- Reuse existing client functions and ExecutionPanel props


## Definition of done
- Handlers wired and typecheck passes
- Unit tests with mocked fetch pass


## Clarifying questions
- None
