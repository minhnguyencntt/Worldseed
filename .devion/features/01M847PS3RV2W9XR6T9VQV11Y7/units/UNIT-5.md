---
id: "01M847PS3SP3J1VY4KQMCK9TTP"
kind: unit
parent: 01M847PS3RZ83V58BTZXP3B0XH
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add Approve and Retry controls to ExecutionPanel

Add approveExecution and retryExecution client functions and render the buttons in ExecutionPanel, wired from AdminApp.

## Acceptance criteria
- Buttons conditional on status
- Click calls the endpoint and reloads
- 409 message shown


## Scope
- In scope: client.ts
- In scope: ExecutionPanel.tsx
- In scope: AdminApp.tsx
- Out of scope: Tests
- Out of scope: Reject
- Preserve: Existing panel fields


## Technical constraints
- Use adminRequest
- New file: `game/frontend/src/api/client.ts`
- New file: `game/frontend/src/components/ExecutionPanel.tsx`
- New file: `game/frontend/src/components/AdminApp.tsx`


## Dependencies
- REQ-5


## Definition of done
- tsc passes


## Clarifying questions
- None
