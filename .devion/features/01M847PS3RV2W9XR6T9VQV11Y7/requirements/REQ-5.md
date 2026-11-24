---
id: "01M847PS3RZ83V58BTZXP3B0XH"
kind: requirement
parent: 01M847PS3RV2W9XR6T9VQV11Y7
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Admin can approve and retry executions

Context: POST /api/v1/admin/executions/{id}/approve works for AWAITING_APPROVAL and /retry for FAILED, answering 409 otherwise. Desired behavior: ExecutionPanel shows Approve when status is AWAITING_APPROVAL and Retry when FAILED, calls the endpoint, reloads executions, and shows the 409 message on conflict. There is no reject endpoint, so no Reject call is made. Why: admin supervises publishing.

## Acceptance criteria
- Given AWAITING_APPROVAL, when Approve is clicked, then POST /api/v1/admin/executions/{id}/approve runs with the Bearer header
- Given FAILED, when Retry is clicked, then POST .../retry runs
- Given other statuses, then neither button renders
- Given a 409, then the error text is shown and buttons remain


## Scope
- In scope: approveExecution, retryExecution, buttons
- Out of scope: Reject endpoint
- Preserve: Stepper


## Technical constraints
- Reject is excluded because the backend lacks it


## Dependencies
- REQ-4


## Definition of done
- Controls working


## Clarifying questions
- The backend has no reject endpoint; should Reject be added later as a backend ticket?
