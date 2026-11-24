---
id: "01M855ASGSA1H24YXXP3B7E20Q"
kind: unit
parent: 01M855ASGRW00F7RAQ59KM5BX5
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add planPreload and resolveTextureKey engine module

Implement the pure planner and the fallback resolver on top of existing manifest types and checkAssetRefs.

## Acceptance criteria
- planPreload returns deduplicated entries and issues
- resolveTextureKey returns the fallback id for unknown or failed keys


## Scope
- In scope: game/src/engine/preload.ts
- Out of scope: tests
- Preserve: manifestLoader.ts exports


## Technical constraints
- No Phaser import
- New file: `game/src/engine/preload.ts`


## Definition of done
- Module compiles under tsc --noEmit


## Clarifying questions
- None
