---
id: "01M848ZFYJ5E173P68XH1YEFX4"
kind: unit
parent: 01M848ZFYJ9EC0MXARTWXXZ6SP
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add onReject prop and Reject button to ExecutionPanel

Modify game/frontend/src/components/ExecutionPanel.tsx: extend ExecutionPanelProps with onReject, destructure it, compute canReject, include it in the actions wrapper condition and render the button.

## Acceptance criteria
- Reject button renders only when status is AWAITING_APPROVAL and onReject is defined
- Clicking Reject calls onReject with the execution id (empty string when id missing, like Approve)


## Scope
- In scope: game/frontend/src/components/ExecutionPanel.tsx
- Out of scope: AdminApp.tsx
- Out of scope: tests
- Preserve: Approve and Retry rendering


## Technical constraints
- Match the existing Approve/Retry code style
- Code path: `game/frontend/src/components/ExecutionPanel.tsx`


## Definition of done
- ExecutionPanel.tsx compiles with tsc --noEmit
- Reject gating matches the requirement


## Clarifying questions
- None
