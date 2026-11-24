---
id: "01M85W6705XVQAT5GWRRT6ZABM"
kind: unit
parent: 01M85W6704S0SWJK2BNQFJ0764
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Author item icon grids and add them to ART_SOURCES

Create game/frontend/src/art/itemIcons.ts following the pattern of sceneExtras.ts (ArtSource entries built from draw.ts helpers) and spread the result into ART_SOURCES in sources.ts so the existing generator picks it up.

## Acceptance criteria
- itemIcons.ts exports ITEM_ICON_SIZE (16), six grid functions and ITEM_SOURCES with six entries.
- sources.ts spreads ITEM_SOURCES into ART_SOURCES after SCENE_EXTRA_SOURCES.
- Each grid uses rampIndex colours and an indigo step 0 outline, with no hardcoded raw indices other than 0 for transparent.


## Scope
- In scope: game/frontend/src/art/itemIcons.ts
- In scope: game/frontend/src/art/sources.ts
- Out of scope: Tests
- Out of scope: Generated PNGs
- Preserve: ArtSource interface and existing sources


## Technical constraints
- Shared palette only, via rampIndex from src/art/draw.ts.
- New file: `game/frontend/src/art/itemIcons.ts`
- Code path: `game/frontend/src/art/sources.ts`


## Dependencies
- REQ1


## Definition of done
- npm run typecheck passes in game/frontend for the new module.


## Clarifying questions
- None
