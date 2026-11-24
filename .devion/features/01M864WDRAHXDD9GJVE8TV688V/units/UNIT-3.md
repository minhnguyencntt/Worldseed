---
id: "01M864WDRB0XPPN602BA78YGNX"
kind: unit
parent: 01M864WDRB4QWGCZE80TNSHYN3
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Replace GameLayout sidebar with full-screen scene and centered story dialog

Remove the grid, aside, motion and drawer toggle; render story in a centered overlay.

## Acceptance criteria
- No aside exists
- Story is inside [data-testid=story-dialog].sf-dialog


## Scope
- In scope: game/frontend/src/components/GameLayout.tsx
- Out of scope: uiStore
- Preserve: header, scene, story props


## Technical constraints
- Overlay wrapper pointer-events-none; dialog pointer-events-auto
- Code path: `game/frontend/src/components/GameLayout.tsx`


## Dependencies
- A1


## Definition of done
- Layout implemented


## Clarifying questions
- None
