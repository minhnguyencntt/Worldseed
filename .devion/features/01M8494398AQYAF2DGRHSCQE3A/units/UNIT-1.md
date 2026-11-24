---
id: "01M8494398QDRGVZKSTVTGR9EJ"
kind: unit
parent: 01M8494398KV7ZZBJEGMAXW2NN
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add onReject prop and Reject button to ExecutionPanel

Edit ExecutionPanel.tsx: extend ExecutionPanelProps with onReject, compute canReject, include it in the actions container condition and render the Reject button after Approve.

## Acceptance criteria
- Given AWAITING_APPROVAL and onReject, when rendered, then a Reject button calls onReject(id)
- Given no onReject or a different status, when rendered, then no Reject button is rendered


## Scope
- In scope: game/frontend/src/components/ExecutionPanel.tsx
- Out of scope: tests
- Out of scope: AdminApp
- Preserve: Approve and Retry


## Technical constraints
- Keep onClick pattern onX?.(id ?? '')
- Code path: `game/frontend/src/components/ExecutionPanel.tsx`


## Definition of done
- Code compiles with tsc --noEmit
- Reject gated as specified


## Clarifying questions
- None
