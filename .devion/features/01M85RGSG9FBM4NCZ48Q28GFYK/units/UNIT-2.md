---
id: "01M85RGSG9BPY2661CH6D7DHSX"
kind: unit
parent: 01M85RGSG95RVKMDM32QN3GP7K
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add art sources, generateAssets and mergeManifest

Add game/frontend/src/art/sources.ts with the ArtSource type and one seed hand-cursor source, and game/frontend/src/lib/generateAssets.ts with generateAssets and mergeManifest.

## Acceptance criteria
- generateAssets returns bytes and a valid entry per source
- mergeManifest replaces by id and keeps others


## Scope
- In scope: sources.ts
- In scope: generateAssets.ts
- Out of scope: tests
- Out of scope: room art
- Preserve: manifest schema
- Preserve: spriteSheet.ts
- Preserve: gridToRgba.ts


## Technical constraints
- Indices come from the shared PALETTE of at most 48 colours
- Entries satisfy assetSchema
- All art generated in-repo
- New file: `game/frontend/src/art/sources.ts`
- New file: `game/frontend/src/lib/generateAssets.ts`


## Dependencies
- ACT-1


## Definition of done
- Typecheck passes


## Clarifying questions
- None
