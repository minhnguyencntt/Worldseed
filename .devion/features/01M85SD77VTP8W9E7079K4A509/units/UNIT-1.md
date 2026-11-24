---
id: "01M85SD77W8DXXVTY7JMY24R7N"
kind: unit
parent: 01M85SD77WCS9424A173AC7BP2
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Point defaultArtPaths at game/public/assets

Edit defaultArtPaths in game/frontend/scripts/generateArt.ts so assetsRoot resolves two levels up from the script dir. The CLI entry already calls defaultArtPaths, so it is wired in with no further change.

## Acceptance criteria
- assetsRoot is resolve(scriptDir, '../../public/assets')
- manifestPath is resolve(assetsRoot, 'worlds/the-boys-room/manifest.json')


## Scope
- In scope: defaultArtPaths body
- Out of scope: tests
- Out of scope: other scripts
- Preserve: createFsIo
- Preserve: runGenerateArt


## Technical constraints
- Deterministic in-repo art generation; shared palette max 48 colours
- Code path: `game/frontend/scripts/generateArt.ts`


## Definition of done
- defaultArtPaths returns game/public/assets paths
- Script still type-checks


## Clarifying questions
- None
