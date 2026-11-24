---
id: "01M85M0QGQQ6P7XGJB3ZVK2KME"
kind: unit
parent: 01M85M0QGQ0GA6NEGXQ1J9EPDR
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: App emits interact and transition from game actions unit tests

Add an App test using the existing fake Phaser host pattern from appObjectClick.test.tsx and a spy on reactToPhaser.emit.

## Acceptance criteria
- Choosing an action emits playAnimation boy interact
- A scene id change emits transitionTo and no change does not


## Scope
- In scope: game/frontend/tests/appGameActionEvents.test.tsx
- Out of scope: Product code
- Preserve: Existing app tests


## Technical constraints
- Phaser, BootScene and createGame mocked; no browser


## Definition of done
- New tests pass


## Clarifying questions
- None
