---
id: "01M84Q71292X7V428FS4Q7E80Q"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-2.3 · The Boy's Room asset folders and manifest referencing real files

Context: game/ has a typed manifest schema (game/src/assets/manifest) but no game/public/assets tree and no manifest file. Desired behavior: worlds/the-boys-room/{backgrounds,furniture,objects,characters,effects,audio} and ui/{icons,frames,cursors} exist and hold real temporary pixel-art assets, and a manifest.json lists them and passes the existing validator. Expected result: every manifest path resolves to a file on disk. Why: future AI cycles can add or replace assets without touching the engine.

## Acceptance criteria
- Given the repo, when the folders are listed, then all 6 world folders and 3 ui folders exist under game/public/assets and each holds at least one file
- Given the manifest.json, when parseManifest runs, then it returns ok with unique ids
- Given the manifest, when each asset path is resolved against game/public/assets, then every file exists


## Scope
- In scope: game/public/assets folder tree with temporary assets
- In scope: manifest.json for the-boys-room
- In scope: manifest file loader that checks files exist
- Out of scope: Phaser rendering
- Out of scope: frontend changes
- Out of scope: production-quality art
- Preserve: existing manifest zod schema API
- Preserve: existing content loader and tests
- Preserve: frontend/public/assets/bedroom.svg


## Technical constraints
- Manifest must satisfy manifestSchema in game/src/assets/manifest/schema.ts
- Assets are temporary and must be documented as such


## Definition of done
- All three requirements delivered and verified by unit tests


## Clarifying questions
- None
