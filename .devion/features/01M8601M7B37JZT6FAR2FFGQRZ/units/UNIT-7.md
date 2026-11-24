---
id: "01M8601M7C2B4QHKYFC73ZHAHM"
kind: unit
parent: 01M8601M7B3QMJXXASYBT7B1KB
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: interact animation emitted on an action unit tests

Render App with Phaser mocked, spy on reactToPhaser.emit.

## Acceptance criteria
- Given a selected bookshelf, when Inspect is clicked, then playAnimation boy interact is emitted once
- Given the action, when clicked, then the story history grows


## Scope
- In scope: tests/appInteract.test.tsx
- Out of scope: real Phaser
- Preserve: existing App tests


## Technical constraints
- Mock createGame, BootScene, phaser and ResizeObserver as tests/appObjectClick.test.tsx does


## Dependencies
- ACT-INTERACT


## Definition of done
- Test passes


## Clarifying questions
- None
