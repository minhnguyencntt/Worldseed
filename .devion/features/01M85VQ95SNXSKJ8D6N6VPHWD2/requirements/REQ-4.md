---
id: "01M85VQ95T6G134ZMZGT183SCH"
kind: requirement
parent: 01M85VQ95SNXSKJ8D6N6VPHWD2
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · All placeholder SVGs and the SVG-only code path are deleted

Context: game/public/assets holds the original SVGs, game/frontend/public/assets holds stale duplicates plus bedroom.svg and a README, and SceneView plus runtime/assets.ts (ASSET_PATHS pointing at /assets/bedroom.svg) are unused by App. Desired: delete all of them. Expected: no .svg anywhere under the two asset roots. Why: it is the Done-when condition.

## Acceptance criteria
- Given game/public/assets and game/frontend/public/assets, when files are listed, then none ends .svg
- Given the frontend source, when imports are scanned, then nothing imports runtime/assets or SceneView
- Given obsolete SVG-only tests, when the suites run, then none remain failing


## Scope
- In scope: Delete svg files, stale README, SceneView.tsx, runtime/assets.ts
- Out of scope: audio wav, hand.png
- Preserve: ambient-room.wav, boy PNGs, hand.png, engine getSceneView


## Technical constraints
- Repository clean-up beyond svg is out of scope


## Dependencies
- R2
- R3


## Definition of done
- Deleted


## Clarifying questions
- None
