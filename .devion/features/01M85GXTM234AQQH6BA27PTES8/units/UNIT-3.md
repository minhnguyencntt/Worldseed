---
id: "01M85GXTM3KTRQEZ3F81PTV9F8"
kind: unit
parent: 01M85GXTM3SFQ205GX4ERCQ18B
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: App mounts PhaserHost once with BootScene and cleans up

Write tests/appPhaserHost.test.tsx and migrate existing App-rendering tests so they mock Phaser.

## Acceptance criteria
- Given Begin is clicked, when App renders, then phaser-host exists and no scene image exists.
- Given the App re-renders and unmounts, when createGame calls are counted, then it was called once and destroy(true) once.


## Scope
- In scope: game/frontend/tests/appPhaserHost.test.tsx
- In scope: mock updates in existing App-rendering tests
- Out of scope: Product code changes
- Preserve: Existing assertions on dialogue, history, inventory and header


## Technical constraints
- Never create a real Phaser game; mock ../src/phaser/createGame and ../src/phaser/BootScene


## Dependencies
- ACT-1


## Definition of done
- New test file passes
- Existing App tests pass with mocks and with Bookshelf selection driven via phaserToReact.emit('objectClick')


## Clarifying questions
- None
