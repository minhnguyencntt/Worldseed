---
id: "01M849YRQYV8MR9HNDJRB0QMH9"
kind: unit
parent: 01M849YRQX7EE9BD4HCXA67Z5S
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Confirm rejectExecution encoding and non-401 failure display

Read rejectExecution and the non-401 branch of runExecutionAction and confirm they behave as the requirement states; no change expected.

## Acceptance criteria
- Given a non-401 failure, when caught, then actionError and actionDetail are set
- Given an id, when rejectExecution builds the URL, then it uses encodeURIComponent


## Scope
- In scope: game/frontend/src/api/client.ts rejectExecution
- In scope: game/frontend/src/components/AdminApp.tsx runExecutionAction
- Out of scope: Test files
- Preserve: Existing behavior


## Technical constraints
- Code path: `game/frontend/src/api/client.ts`
- Code path: `game/frontend/src/components/AdminApp.tsx`


## Definition of done
- Code paths confirmed


## Clarifying questions
- None
