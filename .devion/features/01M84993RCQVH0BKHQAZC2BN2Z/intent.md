---
id: "01M84993RCQVH0BKHQAZC2BN2Z"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-6.4.3 · Wire approve, retry and reject handlers into AdminApp's ExecutionPanel

Context: ExecutionPanel already accepts onApprove, onRetry, onReject and actionError props. The client already exports approveExecution, retryExecution and rejectExecution. AdminApp renders ExecutionPanel without any handlers, so the buttons never appear. Desired behavior: each handler calls the matching client function with the admin token and execution id, reloads Round, contributions and execution afterwards, and shows an error message on failure. Why: the admin can then act on executions from the console.

## Acceptance criteria
- Given an AWAITING_APPROVAL execution, when the admin clicks Approve or Reject, then the matching client endpoint is called with the id and the Bearer token, and the data reloads
- Given a FAILED execution, when the admin clicks Retry, then the retry endpoint is called and the data reloads
- Given an action endpoint answers an error, when the admin clicks the button, then an error message is shown in the Execution region


## Scope
- In scope: game/frontend/src/components/AdminApp.tsx handlers and error state
- Out of scope: Backend changes, including a reject route
- Out of scope: Changes to ExecutionPanel or api/client.ts
- Preserve: Existing round open/close controls
- Preserve: 401 returns to the token gate
- Preserve: Existing admin tests


## Technical constraints
- UI only; reuse approveExecution, retryExecution, rejectExecution from api/client.ts
- Reload through the existing reloads counter


## Definition of done
- All requirements, units and evidence complete


## Clarifying questions
- None
