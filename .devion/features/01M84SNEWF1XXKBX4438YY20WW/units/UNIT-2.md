---
id: "01M84SNEWGRS7C2DTGNTYS1X37"
kind: unit
parent: 01M84SNEWGF2ZTDAXXH2317FGS
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add test:phaser-pin script

Add a script to game/frontend/package.json so the phaser pin guard can run on its own.

## Acceptance criteria
- npm run test:phaser-pin invokes the guard test file
- Other scripts are unchanged


## Scope
- In scope: game/frontend/package.json scripts
- Out of scope: dependency versions
- Preserve: phaser ~3.90.0


## Technical constraints
- Do not change dependencies
- Code path: `game/frontend/package.json`


## Dependencies
- R2
- A1


## Definition of done
- Script present


## Clarifying questions
- None
