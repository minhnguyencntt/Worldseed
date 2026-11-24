---
id: "01M85S3DMPD1TAM6W00HAZ1QTF"
kind: requirement
parent: 01M85S3DMP6Z13VC8P26N5SZPA
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Default manifest and assets paths resolve from the script location

Context: the entry block hardcodes cwd-relative paths. Desired behavior: a pure exported function defaultArtPaths(scriptDir) returns the absolute manifest path game/public/assets/worlds/the-boys-room/manifest.json and the assets root game/public/assets. Why: the CLI must work from any directory and hit the file src/runtime/content.ts imports.

## Acceptance criteria
- Given scriptDir '/repo/game/frontend/scripts', when defaultArtPaths is called, then manifestPath is '/repo/game/public/assets/worlds/the-boys-room/manifest.json'
- Given the same scriptDir, when defaultArtPaths is called, then assetsRoot is '/repo/game/public/assets'


## Scope
- In scope: defaultArtPaths in generateArt.ts
- Out of scope: Other scripts
- Preserve: runGenerateArt behaviour


## Technical constraints
- Use node:path resolve; no process.cwd()


## Definition of done
- defaultArtPaths exported and returns both paths


## Clarifying questions
- None
