---
id: "01M85SD77VTP8W9E7079K4A509"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-1.3.1 defaultArtPaths targets game/public/assets

Context: defaultArtPaths in game/frontend/scripts/generateArt.ts resolves assetsRoot to <scriptDir>/../public/assets (game/frontend/public/assets), but the app manifest imported by src/runtime/content.ts lives at game/public/assets/worlds/the-boys-room/manifest.json. Desired: assetsRoot becomes <scriptDir>/../../public/assets and manifestPath sits under it at worlds/the-boys-room/manifest.json, with the test updated. Why: art:generate must write PNGs and manifest entries where the app reads them.

## Acceptance criteria
- Given scriptDir /repo/game/frontend/scripts, when defaultArtPaths is called, then assetsRoot is /repo/game/public/assets
- Given the same scriptDir, then manifestPath is /repo/game/public/assets/worlds/the-boys-room/manifest.json


## Scope
- In scope: defaultArtPaths path resolution
- In scope: defaultArtPaths unit test
- Out of scope: new rooms
- Out of scope: backend changes
- Out of scope: moving existing assets
- Out of scope: repository clean-up
- Preserve: createFsIo
- Preserve: runGenerateArt behaviour
- Preserve: deterministic PNG encoding
- Preserve: art:generate npm script


## Technical constraints
- One shared palette of at most 48 colours; art is generated deterministically in-repo, no downloaded art
- Unit tests with all dependencies mocked


## Definition of done
- defaultArtPaths returns the game/public/assets paths
- Updated unit test passes


## Clarifying questions
- None
