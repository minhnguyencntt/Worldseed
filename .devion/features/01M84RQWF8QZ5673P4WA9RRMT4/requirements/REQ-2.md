---
id: "01M84RQWF91CA862C18A1JHBHA"
kind: requirement
parent: 01M84RQWF8QZ5673P4WA9RRMT4
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Existing Phaser code compiles and runs on 3.90

Context: src/phaser/createGame.ts, config.ts, BootScene.ts and components/PhaserHost.tsx use Phaser.Game, Phaser.AUTO, Phaser.Scale.FIT, Phaser.Scene and Phaser.Scenes.Events.SHUTDOWN, all present in 3.90. Desired behavior: these files type-check and their tests pass on 3.90 without Phaser 4-only APIs. Expected result: tsc passes and the phaser tests are green. Why: the pin must not break the app.

## Acceptance criteria
- Given Phaser 3.90 installed, When tsc --noEmit runs, Then it exits 0
- Given the src/phaser modules, When scanned, Then they reference only Phaser APIs that exist in 3.90


## Scope
- In scope: game/frontend/src/phaser/createGame.ts
- Out of scope: New features
- Preserve: Public signatures of createGame, buildGameConfig, BootScene


## Technical constraints
- Keep the pixelArt/roundPixels/FIT config


## Dependencies
- REQ1


## Definition of done
- Type-check passes
- Phaser tests pass


## Clarifying questions
- None
