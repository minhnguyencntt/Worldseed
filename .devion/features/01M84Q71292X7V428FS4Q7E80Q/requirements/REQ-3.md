---
id: "01M84Q7129NS7S0B3JNV1JVDAR"
kind: requirement
parent: 01M84Q71292X7V428FS4Q7E80Q
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Manifest loader reports missing asset files without throwing

Context: parseManifest validates shape only, not that files exist. Desired behavior: loadManifestFile(manifestPath, assetsRoot) reads JSON, runs parseManifest, and for each asset checks the file exists under assetsRoot, returning {ok, data, errors} with path-named issues and never throwing on missing or malformed files. Expected result: dangling paths are reported clearly.

## Acceptance criteria
- Given a manifest with all files present, when loaded, then ok is true
- Given an entry whose file is absent, when loaded, then ok is false with an issue naming assets.<i>.path
- Given a missing or malformed manifest file, when loaded, then ok is false and nothing throws


## Scope
- In scope: game/src/assets/loaders/manifestLoader.ts
- Out of scope: Phaser preload
- Preserve: parseManifest signature


## Technical constraints
- Reuse ManifestIssue and parseManifest
- node:fs only


## Definition of done
- Loader implemented


## Clarifying questions
- None
