---
id: "01M8601M7CMQ42FXNQR20A7DY0"
kind: unit
parent: 01M8601M7BRNMGXCC87NBSB6N8
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Emit transitionTo from handleAction when currentScene changes

Extend handleAction (added by the interact Act) to read the store scene id before and after and emit transitionTo on change.

## Acceptance criteria
- Given a changed currentScene, when handleAction runs, then transitionTo is emitted with it
- Given no change, when it runs, then no transitionTo


## Scope
- In scope: App.tsx
- Out of scope: BootScene
- Preserve: playAnimation emission


## Technical constraints
- Run after the interact Act
- Code path: `game/frontend/src/App.tsx`


## Dependencies
- REQ-FADE


## Definition of done
- Emission conditional


## Clarifying questions
- None
