---
id: "01M849HABYD27ZQB25PQ89MZD6"
kind: unit
parent: 01M849HABXFGVGA43KVXAB8XQ5
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add execution action handlers to AdminApp

Edit AdminApp.tsx to import approveExecution, rejectExecution, retryExecution, add runExecutionAction and pass onApprove, onRetry, onReject to ExecutionPanel.

## Acceptance criteria
- AdminApp compiles with the three handlers passed
- Each handler calls its client function with token and id then bumps reloads


## Scope
- In scope: AdminApp.tsx
- Out of scope: Error state
- Preserve: Existing imports and handlers


## Technical constraints
- Single helper, no duplicate declarations
- Code path: `game/frontend/src/components/AdminApp.tsx`


## Definition of done
- npm run typecheck passes


## Clarifying questions
- None
