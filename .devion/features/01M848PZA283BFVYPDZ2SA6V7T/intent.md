---
id: "01M848PZA283BFVYPDZ2SA6V7T"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-6.4 · Wire Approve, Retry and Reject in AdminApp

Context: ExecutionPanel already renders Approve and Retry buttons via onApprove/onRetry props, and client.ts already has approveExecution and retryExecution, but AdminApp passes no handlers and there is no reject call or Reject control. Desired behavior: each action calls the backend, reloads Round and execution data, shows failures, and a 401 returns to the token gate. Expected result: the admin can approve, retry or reject from the console. Why: supervised publishing requires the admin to act on executions.

## Acceptance criteria
- Given an AWAITING_APPROVAL execution, when Approve is clicked, then POST /api/v1/admin/executions/{id}/approve is sent with the Bearer token and the data reloads
- Given a FAILED execution, when Retry is clicked, then POST .../retry is sent and the data reloads
- Given an AWAITING_APPROVAL execution, when Reject is clicked, then POST .../reject is sent and the data reloads
- Given an action that responds 401, when it is clicked, then the token gate with 'Invalid token' is shown
- Given an action that responds 500, when it is clicked, then an alert with the error message is shown


## Scope
- In scope: rejectExecution client function
- In scope: Reject button in ExecutionPanel
- In scope: action handlers in AdminApp
- Out of scope: Backend reject endpoint
- Out of scope: new lifecycle stages
- Preserve: Existing approveExecution/retryExecution signatures
- Preserve: Existing AdminApp token gate, stepper and panel behavior


## Technical constraints
- React + TypeScript, Vitest with mocked fetch only
- Use adminRequest and ApiError from game/frontend/src/api/client.ts


## Definition of done
- All three requirements implemented and unit tests pass


## Clarifying questions
- None
