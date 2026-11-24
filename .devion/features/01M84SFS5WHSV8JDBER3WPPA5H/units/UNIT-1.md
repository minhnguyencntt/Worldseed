---
id: "01M84SFS5W4SCBD6Q93YG36RTD"
kind: unit
parent: 01M84SFS5WTT52TTYRSPJ81RDF
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Document the 3.90 API targets in config.ts and createGame.ts

The audit found only 3.90 APIs in config.ts and createGame.ts. Add a comment naming the 3.90 constants used so a later change to a 4-only API is visible. Do not change behavior.

## Acceptance criteria
- Given config.ts, when read, then a comment states that Phaser.AUTO, Phaser.Scale.FIT and render.pixelArt are the 3.90 APIs in use.
- Given createGame.ts, when read, then it still returns new Phaser.Game(buildGameConfig(parent, scenes)).


## Scope
- In scope: config.ts
- In scope: createGame.ts
- Out of scope: Behavior changes
- Preserve: Exports and signatures


## Technical constraints
- Comments only; no behavior change
- Code path: `game/frontend/src/phaser/config.ts`
- Code path: `game/frontend/src/phaser/createGame.ts`


## Definition of done
- Comments added and the existing tests/phaserConfig.test.ts still passes


## Clarifying questions
- None
