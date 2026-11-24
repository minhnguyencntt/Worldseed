---
id: "01M85M0QGQDQD499W38222F5GR"
kind: unit
parent: 01M85M0QGQ0GA6NEGXQ1J9EPDR
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Emit playAnimation and transitionTo from App game actions

App passes a wrapped action handler to ActionMenu that performs game.act then emits playAnimation for the boy and emits transitionTo when the scene id changed.

## Acceptance criteria
- Choosing an action emits playAnimation boy interact
- A changed scene id emits transitionTo


## Scope
- In scope: game/frontend/src/App.tsx
- Out of scope: Tests
- Out of scope: BootScene changes
- Preserve: game.act and game.choose behavior


## Technical constraints
- Read the scene id from the game store state after the action
- Code path: `game/frontend/src/App.tsx`


## Definition of done
- App emits both events


## Clarifying questions
- None
