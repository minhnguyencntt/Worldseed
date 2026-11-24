---
id: "01M855M826NDNXVQQ7BDH6EZ6F"
kind: unit
parent: 01M855M826E3C405ZASCHH5B77
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add planPreload to the engine

Create the new engine module with the pure planPreload function that collects object assets and dust effect assets from a SceneDef.

## Acceptance criteria
- planPreload dedupes asset ids in first-seen order
- planPreload reports unknown ids separately from load


## Scope
- In scope: game/src/engine/planPreload.ts
- Out of scope: Tests
- Out of scope: BootScene wiring
- Preserve: Other engine files


## Technical constraints
- Import types only from ../state/types and ../assets/manifest
- New file: `game/src/engine/planPreload.ts`


## Dependencies
- REQ1


## Definition of done
- planPreload and PreloadPlan are exported


## Clarifying questions
- None
