---
id: "01M848PZA2Z6EKGSW7PKNG9GSK"
kind: requirement
parent: 01M848PZA283BFVYPDZ2SA6V7T
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · AdminApp runs execution actions, reloads, shows errors and returns to the token gate on 401

AdminApp calls approveExecution, retryExecution and rejectExecution with the token, increments reloads on success, shows failures through actionError and routes 401 to the token gate via handleError.

## Acceptance criteria
- Given each action succeeds, when clicked, then the matching endpoint is called and executions are fetched again
- Given a 401, when an action is clicked, then the token gate shows 'Invalid token'
- Given a non-401 failure, when an action is clicked, then an alert shows the error message


## Scope
- In scope: AdminApp handlers and actionError state
- Out of scope: Round open/close behavior
- Preserve: Existing round actions and loading effect


## Technical constraints
- Reuse handleError and the reloads counter in AdminApp.tsx


## Definition of done
- Handlers wired to ExecutionPanel


## Clarifying questions
- None
