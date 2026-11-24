---
id: "01M85HVG1VXFWDJ8XRNHPDQPXF"
kind: requirement
parent: 01M85HVG1VJFNJH0X5BN5W5P7D
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · App closes the ActionMenu on menuClose and keeps it open on selection

Context: App.tsx stores selectedId and sets it on objectClick (L58). Desired: a menuClose event clears selectedId so the ActionMenu unmounts, and the subscription is released on unmount.

## Acceptance criteria
- Given a selected object with the ActionMenu shown, when menuClose is emitted, then the ActionMenu is removed.
- Given unmount, then the menuClose handler is unsubscribed.


## Scope
- In scope: game/frontend/src/App.tsx
- Out of scope: ActionMenu component
- Preserve: objectClick subscription


## Technical constraints
- Use useEffect returning the unsubscribe from phaserToReact.on


## Dependencies
- REQ1


## Definition of done
- Menu closes on Escape event


## Clarifying questions
- None
