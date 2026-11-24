---
id: "01M85B0RB8XD219DZGSB0B1ZX0"
kind: requirement
parent: 01M85B0RB7DRTS8MPCJSEZNWYH
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · BootScene character tests assert spawn, click, fallback and cleanup

Context: game/frontend/src/phaser/BootScene.ts create (L66-L82) and createCharacter (L103-L124) spawn sprites, emit characterClick and destroy sprites on shutdown. Current tests cover spawn, interact and click. Desired behavior: tests also cover no characters, missing interact fallback and shutdown destroy. Expected result: removing that code fails a test. Why: Phaser cleanup and click wiring must be proven.

## Acceptance criteria
- Given a scene without characters, when create runs, then add.sprite is not called
- Given the SHUTDOWN callback registered via events.once, when invoked, then every character sprite destroy is called
- Given a character without an interact animation, when pointerdown fires, then characterClick is emitted and no other animation plays


## Scope
- In scope: BootScene character wiring tests
- Out of scope: Real Phaser rendering
- Preserve: Existing three tests


## Technical constraints
- Phaser stays mocked
- Run with the frontend vitest config


## Definition of done
- Behaviors covered by tests that fail without the code


## Clarifying questions
- None
