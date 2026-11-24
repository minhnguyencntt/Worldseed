---
id: "01M84QDNDB8AAVF2J706B662QA"
kind: unit
parent: 01M84QDNDBK8MA5RKP1H0KVH36
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add loadManifestWithFallback to the manifest loader

Add a never-throwing loader that keeps existing assets, reports missing ones and returns an empty manifest on unreadable or invalid input.

## Acceptance criteria
- Missing files are listed and dropped from the manifest
- Unreadable manifest yields empty assets plus errors


## Scope
- In scope: game/src/assets/loaders/manifestLoader.ts
- Out of scope: tests
- Preserve: loadManifestFile


## Technical constraints
- No throwing
- Code path: `game/src/assets/loaders/manifestLoader.ts`


## Definition of done
- Function exported and typechecks


## Clarifying questions
- None
