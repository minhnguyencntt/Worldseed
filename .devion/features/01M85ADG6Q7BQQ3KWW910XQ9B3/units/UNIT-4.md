---
id: "01M85ADG6RC6VBP1K0JTMXCRP9"
kind: unit
parent: 01M85ADG6QZCF4SHF92VXJNB86
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: BootScene characterClick emission unit tests with Phaser mocked

Extend bootSceneCharacters tests, which already mock phaser and content, to spy on phaserToReact.emit.

## Acceptance criteria
- Given the mocked scene, When pointerdown runs on the boy sprite, Then phaserToReact.emit is called with 'characterClick' and { id: 'boy' }.
- Given the same click, When handled, Then sprite.play is called with the interact key.


## Scope
- In scope: game/frontend/tests/bootSceneCharacters.test.ts
- Out of scope: real Phaser or browser
- Preserve: existing character tests


## Technical constraints
- Reuse the existing vi.mock('phaser') and content mock and the pointerDownOn helper


## Dependencies
- ACT2


## Definition of done
- New tests pass


## Clarifying questions
- None
