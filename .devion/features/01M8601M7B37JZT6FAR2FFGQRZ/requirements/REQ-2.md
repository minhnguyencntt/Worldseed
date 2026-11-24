---
id: "01M8601M7B3QMJXXASYBT7B1KB"
kind: requirement
parent: 01M8601M7B37JZT6FAR2FFGQRZ
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Game actions emit playAnimation interact so the boy plays the interact animation

Context: App passes game.act directly to ObjectOverlay.onAction, so reactToPhaser.playAnimation is never emitted although BootScene handles it. Desired: wrapped handler runs the action then emits playAnimation for the boy. Why: carry-over behaviour 3.9.

## Acceptance criteria
- Given an object action is chosen, when onAction fires, then reactToPhaser emits playAnimation with target boy and name interact
- Given the action, when it runs, then game state still updates through game.act


## Scope
- In scope: App action handler
- Out of scope: BootScene animation code
- Preserve: game.act behaviour


## Technical constraints
- Use typed reactToPhaser bus


## Dependencies
- INT


## Definition of done
- Emission wired


## Clarifying questions
- None
