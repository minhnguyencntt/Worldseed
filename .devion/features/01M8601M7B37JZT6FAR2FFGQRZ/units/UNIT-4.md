---
id: "01M8601M7C1D67G18AAXE02XCY"
kind: unit
parent: 01M8601M7B8533WQTHKH2DEX3M
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Guard the BootScene transitionTo handler

Add an early return in the transitionTo subscriber.

## Acceptance criteria
- Given empty or unknown id, when handled, then nothing happens
- Given a known id, when handled, then fade and start occur


## Scope
- In scope: BootScene.ts
- Out of scope: others
- Preserve: Phaser 3.90.x


## Technical constraints
- Phaser stays on 3.90.x
- Code path: `game/frontend/src/phaser/BootScene.ts`


## Dependencies
- REQ-IGNORE


## Definition of done
- Guard in place


## Clarifying questions
- None
