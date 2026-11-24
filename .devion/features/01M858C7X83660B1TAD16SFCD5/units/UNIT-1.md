---
id: "01M858C7X97DJ8G30NEEA76JA6"
kind: unit
parent: 01M858C7X8QXGRG2F0HHAHXKGD
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Export ResolveKey type from effectContext

Add an exported ResolveKey type in effectContext.ts and use it for the resolveKey parameter of createPhaserEffectContext.

## Acceptance criteria
- effectContext.ts exports ResolveKey
- createPhaserEffectContext still takes (scene, resolveKey)


## Scope
- In scope: effectContext.ts
- Out of scope: tests
- Preserve: runtime behavior


## Technical constraints
- Code path: `game/frontend/src/phaser/effectContext.ts`


## Definition of done
- ResolveKey exported and used


## Clarifying questions
- None
