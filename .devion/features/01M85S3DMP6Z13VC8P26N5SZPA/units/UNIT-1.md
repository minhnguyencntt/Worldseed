---
id: "01M85S3DMQH5KJ7GT3SPDN9528"
kind: unit
parent: 01M85S3DMPD1TAM6W00HAZ1QTF
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add defaultArtPaths to generateArt.ts

Add a pure exported function in game/frontend/scripts/generateArt.ts that resolves the app manifest and assets root relative to the script directory.

## Acceptance criteria
- defaultArtPaths('/repo/game/frontend/scripts').manifestPath equals '/repo/game/public/assets/worlds/the-boys-room/manifest.json'
- defaultArtPaths('/repo/game/frontend/scripts').assetsRoot equals '/repo/game/public/assets'


## Scope
- In scope: generateArt.ts
- Out of scope: Tests
- Preserve: runGenerateArt


## Technical constraints
- Hard constraint: deterministic in-repo art only
- Use node:path resolve
- Code path: `game/frontend/scripts/generateArt.ts`


## Definition of done
- Function exported with documented return shape


## Clarifying questions
- None
