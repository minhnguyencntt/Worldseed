---
id: "01M849HABYP92DX4GS3MHZEK8S"
kind: requirement
parent: 01M849HABXQVTAKW3WSB6TTXZW
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · AdminApp shows an error message when an execution action fails

Add actionError state to AdminApp. Clear it when an action starts or succeeds. On failure, a 401 ApiError goes to handleError; otherwise set the error message, falling back to 'Request failed'. Pass actionError to ExecutionPanel, which already renders it in a role=alert paragraph.

## Acceptance criteria
- Given an action responds 500 with an error body, when it completes, then the panel shows that message
- Given an action fails with a non-Error value, then 'Request failed' is shown
- Given an action responds 401, then the token gate shows 'Invalid token' and no actionError is shown
- Given a prior failure, when a new action starts, then the old message is cleared


## Scope
- In scope: actionError state and prop
- Out of scope: Backend
- Preserve: handleError


## Technical constraints
- No duplicate declarations


## Definition of done
- actionError passed and displayed


## Clarifying questions
- None
