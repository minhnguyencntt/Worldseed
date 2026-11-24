---
id: "01M85B0RB89TKCNRC81MVE1JEW"
kind: unit
parent: 01M85B0RB8XD219DZGSB0B1ZX0
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Confirm BootScene creates, clicks and destroys character sprites

Read BootScene.ts and confirm characters are created from scene.characters, characterClick is emitted before animation guards, and shutdown destroys sprites. Edit only if missing.

## Acceptance criteria
- create maps scene.characters ?? [] to createCharacter
- The shutdown handler destroys each character sprite and clears the array
- POINTER_DOWN emits characterClick before the interact guards


## Scope
- In scope: game/frontend/src/phaser/BootScene.ts
- Out of scope: Tests
- Preserve: Public methods of BootScene


## Technical constraints
- Phaser 3.90 APIs only
- Code path: `game/frontend/src/phaser/BootScene.ts`


## Definition of done
- All three behaviors present


## Clarifying questions
- None
