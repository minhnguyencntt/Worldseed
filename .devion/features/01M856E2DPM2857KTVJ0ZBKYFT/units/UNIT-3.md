---
id: "01M856E2DQ0S17CAP69WZM8H6J"
kind: unit
parent: 01M856E2DP1WHWVGHQY520WGGC
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Export FALLBACK_KEY from BootScene

Context: BootScene.ts declares const FALLBACK_KEY = 'fallback:missing' privately. Export it so tests assert against the real constant.

## Acceptance criteria
- Given BootScene.ts, when imported, then FALLBACK_KEY equals 'fallback:missing'
- Given BootScene, when resolveKey runs, then behavior is unchanged


## Scope
- In scope: BootScene.ts constant export
- Out of scope: preload and resolveKey logic
- Preserve: Existing frontend BootScene tests


## Technical constraints
- Value stays 'fallback:missing'
- Code path: `game/frontend/src/phaser/BootScene.ts`


## Definition of done
- Constant exported


## Clarifying questions
- None
