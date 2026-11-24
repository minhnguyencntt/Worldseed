---
id: "01M85VQ95T18MHTGXFBMG092QK"
kind: unit
parent: 01M85VQ95S9RJ58YFG37R7B0AR
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add secret door and dust sources, register room sources and run art:generate

Create secret-door and dust grids with draw.ts helpers, add ROOM_SOURCES and the extras to ART_SOURCES, then run the generator so PNGs and manifest entries are committed.

## Acceptance criteria
- ART_SOURCES contains room, boy, extras and cursor sources
- npm run art:generate completes and writes room/*.png, secret-door and dust PNGs


## Scope
- In scope: frontend/src/art
- In scope: generated PNGs
- In scope: manifest entries
- Out of scope: Tests
- Out of scope: Deleting SVGs
- Preserve: Existing manifest entries not produced by sources until Act A2


## Technical constraints
- Palette ramps only via rampIndex
- Deterministic output
- New file: `game/frontend/src/art/sceneExtras.ts`
- Code path: `game/frontend/src/art/sources.ts`
- Code path: `game/public/assets/worlds/the-boys-room/manifest.json`
- New file: `game/public/assets/worlds/the-boys-room/objects/secret-door-open.png`
- New file: `game/public/assets/worlds/the-boys-room/effects/dust.png`
- New file: `game/public/assets/worlds/the-boys-room/room/wall.png`


## Dependencies
- R1


## Definition of done
- Generated files committed
- Manifest passes parseManifest


## Clarifying questions
- None
