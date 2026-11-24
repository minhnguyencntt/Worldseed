---
id: "01M84RZYQYPJ7S1EPPX12DMKDK"
kind: unit
parent: 01M84RZYQYY5V63AHWF1KFDR9Q
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Change phaser to ~3.90.0 in game/frontend/package.json

Change line 18 of game/frontend/package.json from "phaser": "^4.2.1" to "phaser": "~3.90.0". Touch no other line. Do not edit package-lock.json in this unit.

## Acceptance criteria
- Given package.json after the edit, when dependencies.phaser is read, then it is ~3.90.0.
- Given package.json after the edit, when diffed, then only the phaser line changed.


## Scope
- In scope: game/frontend/package.json phaser line
- Out of scope: package-lock.json
- Out of scope: tests
- Preserve: All other dependencies and scripts


## Technical constraints
- Tilde 3.90.x, no caret
- Code path: `game/frontend/package.json`


## Definition of done
- package.json contains "phaser": "~3.90.0"


## Clarifying questions
- None
