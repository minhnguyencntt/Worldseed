---
id: "01M84VT0J39V8GCDY9S1ZT78QD"
kind: unit
parent: 01M84VT0J202TT42DB7C51XRBE
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Extract render constant and add autoRound in buildGameConfig

Edit config.ts so render settings come from an exported constant and scale has autoRound true.

## Acceptance criteria
- render equals the constant with pixelArt, roundPixels true and antialias false
- scale.autoRound is true


## Scope
- In scope: config.ts
- Out of scope: tests
- Preserve: FIT and CENTER_BOTH


## Technical constraints
- Only Phaser.AUTO, Phaser.Scale.FIT, Phaser.Scale.CENTER_BOTH referenced from phaser
- Code path: `game/frontend/src/phaser/config.ts`


## Definition of done
- config.ts compiles under tsc --noEmit


## Clarifying questions
- None
