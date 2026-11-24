---
id: "01M847PS3RY5MY69H3B7JK7SMM"
kind: requirement
parent: 01M847PS3RV2W9XR6T9VQV11Y7
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Lifecycle stepper and execution details show Round progress

Context: round statuses and /api/v1/admin/executions ({id,world_id,round_id,status,error,updated_at}) exist. Desired behavior: LifecycleStepper renders OPEN, CLOSED, ANALYZING, DEVELOPING, TESTING, PUBLISHING, COMPLETED, marking earlier stages done, the current stage with aria-current='step', and later stages pending; an ExecutionPanel shows contribution count, execution duration, agent logs, test results and release version when present, and the failure reason from error. Why: admins see where the cycle is.

## Acceptance criteria
- Given status DEVELOPING, then DEVELOPING has aria-current step, OPEN to ANALYZING are done and TESTING onward pending
- Given each of the seven statuses, then exactly that stage is current
- Given an execution with error 'build failed', then 'build failed' is shown as the failure reason
- Given log, test and release fields present, then they render, and absent fields render 'Not available'
- Given contributions N, then 'Contributions: N' is shown


## Scope
- In scope: LifecycleStepper, ExecutionPanel, listExecutions
- Out of scope: Backend fields for logs/tests/release
- Preserve: AdminApp


## Technical constraints
- Statuses PLANNING and BUILDING map to the DEVELOPING and TESTING stages respectively; FAILED shows the stage of the last known state as failed


## Dependencies
- REQ-3


## Definition of done
- Stepper visible in AdminApp


## Clarifying questions
- None
