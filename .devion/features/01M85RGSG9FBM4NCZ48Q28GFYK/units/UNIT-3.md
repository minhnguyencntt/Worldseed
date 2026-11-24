---
id: "01M85RGSG940S6VQ9641W2G7B4"
kind: unit
parent: 01M85RGSG9A5951ZCTYZFE3EX6
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add runGenerateArt, the generateArt script and the art:generate npm script

Add runGenerateArt with injected IO in generateAssets.ts, the script scripts/generateArt.ts and the npm script.

## Acceptance criteria
- runGenerateArt writes PNGs and the manifest through injected IO
- package.json has art:generate


## Scope
- In scope: runGenerateArt
- In scope: generateArt.ts
- In scope: package.json script
- Out of scope: tests
- Preserve: other npm scripts


## Technical constraints
- Assets root game/frontend/public/assets; manifest game/public/assets/worlds/the-boys-room/manifest.json
- Phaser pin unchanged
- New file: `game/frontend/src/lib/generateAssets.ts`
- New file: `game/frontend/scripts/generateArt.ts`
- Code path: `game/frontend/package.json`


## Dependencies
- ACT-2


## Definition of done
- npm run art:generate runs


## Clarifying questions
- None
