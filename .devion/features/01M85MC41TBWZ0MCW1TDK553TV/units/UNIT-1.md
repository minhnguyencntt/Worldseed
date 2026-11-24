---
id: "01M85MC41VW007DCAAXFT6FCZZ"
kind: unit
parent: 01M85MC41TSRRRFAGTD3P72QR3
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Subscribe BootScene to playAnimation and dispatch to character sprites

Add a character lookup map, a playCharacterAnimation method, and subscribe to reactToPhaser playAnimation in create().

## Acceptance criteria
- playAnimation with target 'boy' name 'interact' calls play with the interact key
- Unknown target is ignored without throwing


## Scope
- In scope: BootScene.ts
- Out of scope: Shutdown unsubscribe
- Preserve: characterClick behavior


## Technical constraints
- Phaser 3.90
- Code path: `game/frontend/src/phaser/BootScene.ts`


## Dependencies
- REQ1


## Definition of done
- BootScene handles playAnimation for known characters


## Clarifying questions
- None
