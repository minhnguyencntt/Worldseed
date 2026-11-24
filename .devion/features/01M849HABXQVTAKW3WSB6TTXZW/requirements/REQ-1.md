---
id: "01M849HABXFGVGA43KVXAB8XQ5"
kind: requirement
parent: 01M849HABXQVTAKW3WSB6TTXZW
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · AdminApp passes approve, retry and reject handlers that call the client and reload

AdminApp imports approveExecution, rejectExecution, retryExecution, adds runExecutionAction(action, id) that calls the client with the token and then increments reloads, and passes the three handlers to ExecutionPanel.

## Acceptance criteria
- Given the panel shows Approve, when clicked, then POST /api/v1/admin/executions/{id}/approve is called with Bearer token and executions are refetched
- Given Retry or Reject is clicked, then the retry or reject endpoint is POSTed and the data is refetched


## Scope
- In scope: AdminApp handlers
- Out of scope: Error display
- Preserve: runRoundAction


## Technical constraints
- Use setReloads to reload


## Definition of done
- Handlers passed to ExecutionPanel


## Clarifying questions
- None
