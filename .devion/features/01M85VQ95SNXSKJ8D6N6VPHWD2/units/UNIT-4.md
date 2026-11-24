---
id: "01M85VQ95TM2Y86MP3XRQSHSZG"
kind: unit
parent: 01M85VQ95T6G134ZMZGT183SCH
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Delete placeholder SVGs, stale frontend/public assets and SceneView

git rm all svg files under both asset roots, the duplicate README, frontend/src/components/SceneView.tsx and frontend/src/runtime/assets.ts.

## Acceptance criteria
- No .svg under the asset roots
- SceneView and ASSET_PATHS are gone


## Scope
- In scope: Deletions
- Out of scope: Other files
- Preserve: audio, PNGs


## Technical constraints
- Run only after content and manifest are switched
- Code path: `game/frontend/public/assets/bedroom.svg`
- Code path: `game/frontend/public/assets/README.md`
- Code path: `game/frontend/public/assets/ui/icons/sound.svg`
- Code path: `game/frontend/public/assets/worlds/the-boys-room/backgrounds/bedroom-room.svg`
- Code path: `game/public/assets/ui/icons/sound.svg`
- Code path: `game/public/assets/worlds/the-boys-room/backgrounds/bedroom-room.svg`
- Code path: `game/public/assets/worlds/the-boys-room/characters/boy-sheet.svg`
- Code path: `game/frontend/src/components/SceneView.tsx`
- Code path: `game/frontend/src/runtime/assets.ts`


## Dependencies
- R4
- A3


## Definition of done
- git ls-files shows no svg under public


## Clarifying questions
- None
