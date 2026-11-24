---
id: "01M85XAD0N3966JAS0KVTGGX4D"
kind: unit
parent: 01M85XAD0NNJ29M76M3DA2DHXQ
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Author nine-slice frame sources and register them for art:generate

Pure frame grid builder, FRAME_KIT registry, sources and generated output.

## Acceptance criteria
- FRAME_KIT lists nine frames
- art:generate writes PNGs and manifest entries


## Scope
- In scope: src/art/uiFrames.ts
- In scope: sources.ts
- In scope: generated assets and manifest
- Out of scope: tests
- Preserve: ui/cursor-hand
- Preserve: ROOM, boy, item sources


## Technical constraints
- Deterministic script, palette-only art, at most 48 colours
- New file: `game/frontend/src/art/uiFrames.ts`
- Code path: `game/frontend/src/art/sources.ts`
- Code path: `game/public/assets/worlds/the-boys-room/manifest.json`


## Dependencies
- R3


## Definition of done
- PNGs exist under game/public/assets/ui/frames with manifest entries


## Clarifying questions
- None
