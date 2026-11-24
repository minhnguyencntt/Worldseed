---
id: "01M85SD77W115HQJSCM7M7FA6X"
kind: unit
parent: 01M85SD77WCS9424A173AC7BP2
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: defaultArtPaths unit tests for game/public/assets

Update the existing test in game/frontend/tests/generateArtScript.test.ts, which uses no I/O, to assert the game/public/assets paths.

## Acceptance criteria
- Test expects assetsRoot /repo/game/public/assets
- Test expects manifestPath /repo/game/public/assets/worlds/the-boys-room/manifest.json


## Scope
- In scope: generateArtScript.test.ts defaultArtPaths test
- Out of scope: product code
- Preserve: createFsIo and runGenerateArt tests


## Technical constraints
- Unit tests only, fs mocked


## Definition of done
- Updated test passes
- Other tests in the file still pass


## Clarifying questions
- None
