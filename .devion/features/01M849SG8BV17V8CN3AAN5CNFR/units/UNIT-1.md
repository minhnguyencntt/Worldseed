---
id: "01M849SG8BDK8V5AGQZT13DZDS"
kind: unit
parent: 01M849SG8B7W4FH2XENKVVH3F7
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Clear action error state in the handleError 401 branch

Edit handleError in AdminApp.tsx so the 401 branch clears the action error state together with the token.

## Acceptance criteria
- The 401 branch calls setActionError(undefined) and setActionDetail(undefined).
- Non-401 errors still call setError.


## Scope
- In scope: AdminApp.tsx handleError
- Out of scope: Tests
- Preserve: runExecutionAction non-401 handling


## Technical constraints
- Code path: `game/frontend/src/components/AdminApp.tsx`


## Definition of done
- Code change applied


## Clarifying questions
- None
