---
id: "01M85HVG1WYQ34V27R8RQC283P"
kind: unit
parent: 01M85HVG1VXFWDJ8XRNHPDQPXF
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: menuClose closes the ActionMenu and unsubscribes on unmount

New App test mirroring appObjectClick.test.tsx.

## Acceptance criteria
- After objectClick the menu is shown; after menuClose it is gone.
- Unmount removes the handler.


## Scope
- In scope: game/frontend/tests/appMenuClose.test.tsx
- Out of scope: Product code
- Preserve: appObjectClick tests


## Technical constraints
- Copy the mocks (PhaserHost, API client, content) from game/frontend/tests/appObjectClick.test.tsx


## Definition of done
- Tests pass


## Clarifying questions
- None
