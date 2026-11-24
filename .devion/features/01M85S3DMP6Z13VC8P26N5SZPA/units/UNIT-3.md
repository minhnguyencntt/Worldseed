---
id: "01M85S3DMQMCSVCPDE2YWBTF2Z"
kind: unit
parent: 01M85S3DMPD1TAM6W00HAZ1QTF
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: defaultArtPaths unit tests

Unit tests for defaultArtPaths, no I/O involved.

## Acceptance criteria
- manifestPath equals '/repo/game/public/assets/worlds/the-boys-room/manifest.json' for scriptDir '/repo/game/frontend/scripts'
- assetsRoot equals '/repo/game/public/assets'


## Scope
- In scope: game/frontend/tests/generateArtScript.test.ts
- Out of scope: Product code
- Preserve: Existing tests in that file


## Technical constraints
- Hard constraint: unit tests with all dependencies mocked


## Dependencies
- ACT1


## Definition of done
- Tests pass


## Clarifying questions
- None
