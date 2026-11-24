---
id: "01M85S3DMQP0P69G3D25SVQQ8K"
kind: unit
parent: 01M85S3DMPE72TZPHFV0MP1B20
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: createFsIo reads and rewrites the app manifest with mocked fs

Unit tests for createFsIo and runGenerateArt using a fake fs object (vi.fn) and no disk access.

## Acceptance criteria
- With a fake fs serving the existing manifest at the default path, runGenerateArt writes merged JSON to that same path
- A fake fs whose readFileSync throws makes readText throw
- PNG files are written under the default assetsRoot


## Scope
- In scope: game/frontend/tests/generateArtScript.test.ts
- Out of scope: Product code
- Preserve: Existing identical-bytes tests


## Technical constraints
- Hard constraint: unit tests with all dependencies mocked
- Fixture manifest content comes from the AssetManifest type in @game/assets/manifest, e.g. { version: 1, assets: [] }


## Dependencies
- ACT2


## Definition of done
- Tests pass


## Clarifying questions
- None
