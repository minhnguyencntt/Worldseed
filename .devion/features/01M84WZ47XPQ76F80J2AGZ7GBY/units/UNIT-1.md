---
id: "01M84WZ47Y1ZHY78M6N57376FG"
kind: unit
parent: 01M84WZ47YE45RHXFTSZY7KMDE
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add layers and renderContext engine modules

Create game/src/engine/layers.ts and game/src/engine/renderContext.ts reusing Layer from content/schema.ts.

## Acceptance criteria
- LAYER_ORDER lists six layers in order
- layerDepth is increasing and falls back to objects


## Scope
- In scope: two new files
- Out of scope: tests
- Preserve: content/schema.ts


## Technical constraints
- No phaser import
- New file: `game/src/engine/layers.ts`
- New file: `game/src/engine/renderContext.ts`


## Definition of done
- Modules compile under tsc


## Clarifying questions
- None
