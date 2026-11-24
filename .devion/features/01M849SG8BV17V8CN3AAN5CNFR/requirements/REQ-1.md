---
id: "01M849SG8B7W4FH2XENKVVH3F7"
kind: requirement
parent: 01M849SG8BV17V8CN3AAN5CNFR
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Approve, Retry and Reject 401 clear the token and show the gate with no stale action error

runExecutionAction already delegates a 401 to handleError. handleError must also clear actionError and actionDetail so no earlier action failure survives the return to the gate.

## Acceptance criteria
- Given approve, retry or reject returns 401, when the response arrives, then the token gate shows 'Invalid token'.
- Given actionError was set by a prior 500, when a 401 follows, then actionError and actionDetail are cleared.


## Scope
- In scope: handleError 401 branch in AdminApp.tsx
- Out of scope: Backend
- Preserve: Non-401 error display


## Technical constraints
- Reuse the existing handleError


## Definition of done
- 401 branch clears token, actionError and actionDetail


## Clarifying questions
- None
