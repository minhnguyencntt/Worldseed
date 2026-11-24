---
id: "01M84993RD65SCSHFVRRFFV5HA"
kind: requirement
parent: 01M84993RCQVH0BKHQAZC2BN2Z
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · AdminApp passes approve, retry and reject handlers that call the client and reload

AdminApp currently renders ExecutionPanel with only execution and contributionCount. It must pass onApprove, onRetry and onReject. Each calls approveExecution, retryExecution or rejectExecution with the admin token and the execution id, then increments the reloads counter so the Round, contributions and execution are fetched again.

## Acceptance criteria
- Given an AWAITING_APPROVAL execution, when Approve is clicked, then POST /api/v1/admin/executions/{id}/approve is sent and the data is fetched again
- Given a FAILED execution, when Retry is clicked, then POST /api/v1/admin/executions/{id}/retry is sent and the data is fetched again
- Given an AWAITING_APPROVAL execution, when Reject is clicked, then POST /api/v1/admin/executions/{id}/reject is sent and the data is fetched again


## Scope
- In scope: AdminApp.tsx execution handlers
- Out of scope: Backend
- Out of scope: ExecutionPanel markup
- Preserve: runRoundAction behavior


## Technical constraints
- Reuse the reloads counter


## Definition of done
- Handlers wired and verified by unit tests


## Clarifying questions
- None
