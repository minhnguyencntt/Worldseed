---
id: "01M84VZY5BT11EKN5PQR5DMW3C"
kind: requirement
parent: 01M84VZY5AEZ8D03YJAHT7N6ZC
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Game config accepts and applies a zoom computed with computeZoom

Context: buildGameConfig(parent, scenes) in game/frontend/src/phaser/config.ts builds the config without zoom, and createGame forwards only parent and scenes. Desired behavior: an optional zoom argument is forwarded and set as scale.zoom. Expected result: the Phaser game starts with the DPR-derived zoom. Why: initial render uses the correct pixel density.

## Acceptance criteria
- Given zoom 3, when buildGameConfig(parent, scenes, 3) is called, then config.scale.zoom equals 3
- Given no zoom, when buildGameConfig(parent, scenes) is called, then config.scale.zoom equals 1
- Given createGame(parent, scenes, 2), when it runs, then buildGameConfig receives zoom 2


## Scope
- In scope: config.ts buildGameConfig
- In scope: createGame.ts createGame
- Out of scope: PhaserHost
- Preserve: Existing render and scale keys


## Technical constraints
- Phaser 3.90 config key scale.zoom


## Definition of done
- Config carries zoom and defaults to 1


## Clarifying questions
- None
