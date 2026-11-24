---
id: "01M85S3DMP6Z13VC8P26N5SZPA"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-1.3 generateArt CLI targets the manifest and assets the app consumes

Context: game/frontend/scripts/generateArt.ts runs the generator with manifestPath 'public/assets/manifest.json' and assetsRoot 'public/assets', resolved against the current directory. The app imports game/public/assets/worlds/the-boys-room/manifest.json in src/runtime/content.ts, so the CLI never touches that file. Desired behavior: the CLI reads and rewrites the existing manifest and writes PNGs under game/public/assets, wherever it is started from. Why: the Done-when for SG-1.3 requires the script to update the manifest the app consumes.

## Acceptance criteria
- Given the CLI is started from any directory, when it resolves its defaults, then manifestPath ends with game/public/assets/worlds/the-boys-room/manifest.json and assetsRoot ends with game/public/assets
- Given a mocked fs with the existing manifest, when the CLI I/O runs, then that manifest is read and rewritten and no other manifest file is created
- Given the existing generateArt tests, when they run, then identical bytes and npm script behaviour still pass


## Scope
- In scope: Default path resolution in game/frontend/scripts/generateArt.ts
- In scope: Unit test with mocked I/O asserting the default paths
- Out of scope: New art sources
- Out of scope: Changes to generateAssets, mergeManifest or encodePng
- Out of scope: Backend, audio, deployment
- Preserve: runGenerateArt signature and determinism
- Preserve: art:generate npm script
- Preserve: Phaser 3.90.x pin


## Technical constraints
- Hard constraint: all art generated deterministically in-repo, no downloads or CDN
- Hard constraint: tests are unit tests with all dependencies mocked
- Paths come from the script location (import.meta.url), not process.cwd()


## Definition of done
- CLI default paths point at the-boys-room manifest and public/assets
- Unit test asserts the default paths with I/O mocked


## Non-functional requirements
- Deterministic output


## Clarifying questions
- None
