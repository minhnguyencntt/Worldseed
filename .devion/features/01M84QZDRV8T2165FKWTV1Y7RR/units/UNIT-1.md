---
id: "01M84QZDRV92CF2NQQZ3Z2WA1C"
kind: unit
parent: 01M84QZDRVNM7KF5TMY7VCNGEJ
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add findMissingAssetPaths to the manifest loader

Add findMissingAssetPaths(manifest, presentFiles) to manifestLoader.ts next to checkAssetRefs, returning the asset paths not found in presentFiles.

## Acceptance criteria
- Returns [] when every manifest path is in presentFiles
- Returns the paths not in presentFiles, in manifest order


## Scope
- In scope: game/src/assets/loaders/manifestLoader.ts
- Out of scope: Tests
- Out of scope: Other loader functions
- Preserve: loadManifestFile, loadManifestWithFallback, checkAssetRefs


## Technical constraints
- Pure function, no fs access
- Code path: `game/src/assets/loaders/manifestLoader.ts`


## Definition of done
- Helper exported with typed signature; typecheck passes


## Clarifying questions
- None
