---
id: "01M84J88PS76C6N1JH14DX6NT3"
kind: unit
parent: 01M84J88PSJVC1D76BGSY6PZNB
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Remove execution state, fetch, handlers and panel from AdminApp

AdminApp.tsx: drop the ExecutionPanel import and render, execution/actionError/actionDetail state, runExecutionAction, and the listExecutions call in the load effect; stepper uses round.status.

## Acceptance criteria
- AdminApp makes no executions request
- Stepper receives round.status
- No execution identifiers remain in the file


## Scope
- In scope: AdminApp.tsx
- Out of scope: client.ts
- Out of scope: LifecycleStepper
- Preserve: Round controls and 401 handling


## Technical constraints
- Keep Promise.all for round and contributions
- Code path: `game/frontend/src/components/AdminApp.tsx`


## Definition of done
- AdminApp has no execution references


## Clarifying questions
- None
