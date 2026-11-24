---
id: "01M85TDR9EGC6R7WNBXWJ58WRY"
kind: unit
parent: 01M85TDR9ERS48353PZ53BCKGQ
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Carry animations and origin into generated entries and register boy sources

ArtSource gains optional animations and origin; generateAssets copies them; BOY_SHEET_SOURCE declares idle/walk/interact; ART_SOURCES includes BOY_SOURCES; run art:generate to write PNGs and manifest.

## Acceptance criteria
- entries carry animations and origin
- ART_SOURCES includes boy ids
- manifest regenerated and valid


## Scope
- In scope: sources.ts
- In scope: generateAssets.ts
- In scope: boy.ts
- In scope: manifest.json
- Out of scope: SVG removal
- Preserve: existing entries


## Technical constraints
- Deterministic script; no downloaded art
- Manifest must pass parseManifest
- Code path: `game/frontend/src/art/sources.ts`
- Code path: `game/frontend/src/lib/generateAssets.ts`
- New file: `game/frontend/src/art/boy.ts`
- Code path: `game/public/assets/worlds/the-boys-room/manifest.json`


## Definition of done
- npm run art:generate succeeds


## Clarifying questions
- None
