---
id: "01M84VZY5BWTZ30QAABYK0SYRA"
kind: unit
parent: 01M84VZY5BT11EKN5PQR5DMW3C
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add zoom parameter to buildGameConfig and createGame

Add an optional zoom argument to buildGameConfig and createGame so the game is created with the computed zoom.

## Acceptance criteria
- buildGameConfig sets scale.zoom to the given zoom, default 1
- createGame forwards its zoom argument


## Scope
- In scope: config.ts
- In scope: createGame.ts
- Out of scope: PhaserHost
- Preserve: Other config keys


## Technical constraints
- Phaser 3.90
- Code path: `game/frontend/src/phaser/config.ts`
- Code path: `game/frontend/src/phaser/createGame.ts`


## Definition of done
- Signatures updated and type-check clean


## Clarifying questions
- None
