---
id: "01M84QDNDB80CJH4MK0WD724CF"
kind: unit
parent: 01M84QDNDBBV3C831C2DEE6846
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add checkAssetRefs to the manifest loader

Add a pure helper next to loadManifestFile that compares a list of asset refs to manifest ids.

## Acceptance criteria
- checkAssetRefs returns one issue per unknown ref
- checkAssetRefs returns [] when all refs exist


## Scope
- In scope: game/src/assets/loaders/manifestLoader.ts
- Out of scope: tests
- Preserve: loadManifestFile


## Technical constraints
- No throwing, no fs access
- Code path: `game/src/assets/loaders/manifestLoader.ts`


## Definition of done
- Helper exported and typechecks


## Clarifying questions
- None
