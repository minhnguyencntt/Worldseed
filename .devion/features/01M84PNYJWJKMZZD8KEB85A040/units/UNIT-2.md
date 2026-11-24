---
id: "01M84PNYJX4GJTVXSK165XF7SJ"
kind: unit
parent: 01M84PNYJXM6DHX5TFJP5MM15N
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add manifest zod schemas and inferred types

Create game/src/assets/manifest/schema.ts defining schemas and exported inferred types.

## Acceptance criteria
- Module exports assetSchema and manifestSchema as zod schemas
- Module exports types AssetEntry, AssetManifest, AnimationDef, FrameSpec and InteractionBounds


## Scope
- In scope: game/src/assets/manifest/schema.ts
- Out of scope: validate.ts
- Preserve: Existing src


## Technical constraints
- zod
- New file: `game/src/assets/manifest/schema.ts`


## Dependencies
- zod dependency


## Definition of done
- Schemas compile under tsc --noEmit


## Clarifying questions
- None
