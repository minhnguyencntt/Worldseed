---
id: "01M84993RDSS3CNTSSAEKDQ0HN"
kind: unit
parent: 01M84993RD65SCSHFVRRFFV5HA
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add execution action handlers to AdminApp

Import approveExecution, retryExecution, rejectExecution in AdminApp.tsx. Add a runExecutionAction helper modelled on runRoundAction, and pass onApprove, onRetry and onReject to ExecutionPanel.

## Acceptance criteria
- ExecutionPanel receives onApprove, onRetry and onReject from AdminApp
- Each handler awaits the client call and then increments reloads


## Scope
- In scope: AdminApp.tsx
- Out of scope: Tests
- Preserve: runRoundAction


## Technical constraints
- Types: (token: string, id: string) => Promise<ExecutionInfo>
- Code path: `game/frontend/src/components/AdminApp.tsx`


## Definition of done
- Handlers passed to ExecutionPanel
- npm run typecheck passes in game/frontend


## Clarifying questions
- None
