---
id: "01M84QDNDBK8MA5RKP1H0KVH36"
kind: requirement
parent: 01M84QDNDA6BJBN70KKK2ZCMXK
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Loader reports missing asset files and falls back without crashing

Context: loadManifestFile returns ok:false when any file is missing, giving callers nothing to render. Desired behavior: a new loadManifestWithFallback returns { manifest, missing, errors, fallbackAssetId } where manifest contains only assets whose files exist, missing lists absent assets, and an unreadable or invalid manifest yields an empty manifest with errors. Expected result: the game keeps running with a fallback asset id for anything missing. Why: no crash on missing art.

## Acceptance criteria
- Given one existing and one missing asset file, when loadManifestWithFallback runs, then manifest holds only the existing asset and missing names the other id and path.
- Given a nonexistent manifest file, when it runs, then it returns an empty assets list and one error, and does not throw.
- Given all files exist, when it runs, then missing is empty and the result equals the full manifest.


## Scope
- In scope: loadManifestWithFallback and FALLBACK_ASSET_ID in manifestLoader.ts
- Out of scope: creating a real fallback image
- Out of scope: Phaser texture generation
- Preserve: loadManifestFile signature and behavior


## Technical constraints
- Must never throw
- Build on loadManifestFile and parseManifest


## Definition of done
- loadManifestWithFallback exported and covered by unit tests


## Clarifying questions
- None
