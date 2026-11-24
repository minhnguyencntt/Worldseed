---
id: "01M849YRQX6MHKSYEWC7AE3N06"
kind: unit
parent: 01M849YRQX7CK61M97F1YXWD7R
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Confirm AdminApp 401 branch covers Retry and Reject

Read AdminApp.runExecutionAction and confirm the 401 branch applies to approve, retry and reject alike; no code change is expected unless a gap is found.

## Acceptance criteria
- Given any execution action returns 401, when runExecutionAction catches it, then handleError clears the token and sets gateError 'Invalid token'
- Given a non-401 error, when caught, then handleError is not called


## Scope
- In scope: game/frontend/src/components/AdminApp.tsx runExecutionAction
- Out of scope: Test files
- Preserve: Existing handlers


## Technical constraints
- Code path: `game/frontend/src/components/AdminApp.tsx`


## Definition of done
- 401 branch confirmed to be action-agnostic


## Clarifying questions
- None
