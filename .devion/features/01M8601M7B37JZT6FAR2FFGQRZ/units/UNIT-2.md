---
id: "01M8601M7CWM31KSD1FF72AMSZ"
kind: unit
parent: 01M8601M7B3QMJXXASYBT7B1KB
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Emit playAnimation interact from the App action handler

Create handleAction that calls game.act then emits playAnimation for the boy.

## Acceptance criteria
- Given handleAction, when called, then game.act runs and playAnimation interact is emitted
- Given ObjectOverlay, when rendered, then onAction is handleAction


## Scope
- In scope: App.tsx
- Out of scope: BootScene
- Preserve: overlay props


## Technical constraints
- React stays
- Code path: `game/frontend/src/App.tsx`


## Dependencies
- REQ-INTERACT


## Definition of done
- Overlay uses handleAction


## Clarifying questions
- None
