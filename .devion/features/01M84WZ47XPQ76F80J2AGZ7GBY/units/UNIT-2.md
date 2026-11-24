---
id: "01M84WZ47YWMCBB5EMJ7Q12RFG"
kind: unit
parent: 01M84WZ47Y1KGEPRSW570N8QXJ
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add SceneObject entity

Create game/src/entities/SceneObject.ts wrapping an ObjectSpec and a RenderHandle.

## Acceptance criteria
- Constructor creates one sprite at layer depth
- sync applies visibleWhen
- destroy releases handle


## Scope
- In scope: one new file
- Out of scope: input handling
- Preserve: systems/conditions.ts


## Technical constraints
- No phaser import
- New file: `game/src/entities/SceneObject.ts`


## Dependencies
- ACT1


## Definition of done
- Compiles under tsc


## Clarifying questions
- None
