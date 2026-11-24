---
id: "01M84WZ47YKM1WZXABJY78P0X8"
kind: unit
parent: 01M84WZ47YP72RCFG79XJPZMRC
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add buildScene step

Create game/src/engine/buildScene.ts that builds SceneObjects from a SceneSpec.

## Acceptance criteria
- One entity is created per scene object
- Entities are returned ordered by layer depth


## Scope
- In scope: one new file
- Out of scope: preload
- Preserve: content schema


## Technical constraints
- Stable sort by depth
- New file: `game/src/engine/buildScene.ts`


## Dependencies
- ACT2


## Definition of done
- Compiles under tsc


## Clarifying questions
- None
