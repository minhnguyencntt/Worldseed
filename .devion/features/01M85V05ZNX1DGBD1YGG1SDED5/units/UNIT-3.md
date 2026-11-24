---
id: "01M85V05ZPPA6QET92N2B4AAX1"
kind: unit
parent: 01M85V05ZPN09QQFVTJTAK9F00
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Carry animations and origin into generated entries and register boy sources

Add optional animations and origin to ArtSource, copy them in generateAssets, declare boy animations and origin, register BOY_SOURCES.

## Acceptance criteria
- Entries copy animations and origin when present
- ART_SOURCES includes boy sources


## Scope
- In scope: sources.ts
- In scope: generateAssets.ts
- In scope: boy.ts animation fields
- Out of scope: room sources
- Preserve: entries for sources without the fields


## Technical constraints
- Types from @game/assets/manifest (AnimationDef, Origin)
- Code path: `game/frontend/src/art/sources.ts`
- Code path: `game/frontend/src/lib/generateAssets.ts`
- New file: `game/frontend/src/art/boy.ts`


## Definition of done
- Typecheck passes for touched files


## Clarifying questions
- None
