---
id: "01M85SD77WCS9424A173AC7BP2"
kind: requirement
parent: 01M85SD77VTP8W9E7079K4A509
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# defaultArtPaths resolves assetsRoot and manifestPath under game/public/assets

Context: generateArt.ts L22-L25 builds assetsRoot with resolve(scriptDir, '../public/assets'). Desired: resolve(scriptDir, '../../public/assets') and manifestPath = resolve(assetsRoot, 'worlds/the-boys-room/manifest.json'). Expected result: the CLI entry (line 68) writes into game/public/assets. Why: the app reads that manifest via src/runtime/content.ts.

## Acceptance criteria
- Given /repo/game/frontend/scripts, when defaultArtPaths runs, then assetsRoot equals /repo/game/public/assets
- Given the same input, then manifestPath equals /repo/game/public/assets/worlds/the-boys-room/manifest.json


## Scope
- In scope: generateArt.ts defaultArtPaths
- Out of scope: asset content
- Out of scope: backend
- Preserve: ArtPaths interface
- Preserve: CLI entry wiring


## Technical constraints
- Deterministic in-repo generation; shared palette max 48 colours


## Definition of done
- Paths resolve as specified


## Clarifying questions
- None
