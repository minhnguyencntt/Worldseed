---
id: "01M84993RDFE29BTK2QNC5YEK5"
kind: requirement
parent: 01M84993RCQVH0BKHQAZC2BN2Z
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · AdminApp shows an error message when an execution action fails

When an execution action rejects, AdminApp stores the message in an actionError state and passes it as the actionError prop to ExecutionPanel, which renders it with role alert. A 401 still returns to the token gate. A later successful action clears the message.

## Acceptance criteria
- Given the approve endpoint answers 500, when Approve is clicked, then the Execution region shows an alert containing the error message
- Given an action endpoint answers 401, when a button is clicked, then the token gate is shown with 'Invalid token'
- Given a previous action failed, when a later action succeeds, then the action error is no longer shown


## Scope
- In scope: actionError state in AdminApp.tsx
- Out of scope: Backend
- Preserve: handleError 401 behavior
- Preserve: top-level error paragraph for load failures


## Technical constraints
- Use the existing actionError prop of ExecutionPanel


## Definition of done
- Errors shown and verified by unit tests


## Clarifying questions
- None
