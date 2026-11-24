---
id: "01M84993RDSVH4WV7M19JP8E5S"
kind: unit
parent: 01M84993RDFE29BTK2QNC5YEK5
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Show execution action failures through actionError

Add actionError state to AdminApp.tsx, set it in runExecutionAction's catch for non-401 errors, clear it on success, and pass it to ExecutionPanel as actionError.

## Acceptance criteria
- A failed action shows its message in the Execution region
- A 401 still shows the token gate
- A successful action clears the message


## Scope
- In scope: AdminApp.tsx
- Out of scope: Tests
- Out of scope: ExecutionPanel
- Preserve: handleError for load failures


## Technical constraints
- Depends on the runExecutionAction helper from the handler unit
- Code path: `game/frontend/src/components/AdminApp.tsx`


## Dependencies
- ACT1


## Definition of done
- actionError state wired
- npm run typecheck passes in game/frontend


## Clarifying questions
- None
