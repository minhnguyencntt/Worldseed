---
id: "01M855M826XA4NEJ3H488X6FR4"
kind: requirement
parent: 01M855M8266NY059ZY7SSJK91X
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · resolveTextureKey returns the fallback asset id for unknown ids

Context: missing assets must not crash rendering. Desired behavior: resolveTextureKey(id, manifest, fallbackId) returns id when the manifest has it, and returns fallbackId when the id is unknown or undefined. Expected result: a texture key that is always safe to use. Why: the scene needs a safe texture key for objects whose asset is missing.

## Acceptance criteria
- Given an id present in the manifest, when resolveTextureKey runs, then it returns that id.
- Given an id absent from the manifest, when resolveTextureKey runs, then it returns the fallback id.
- Given an undefined id, when resolveTextureKey runs, then it returns the fallback id.


## Scope
- In scope: resolveTextureKey function
- Out of scope: Generating the fallback texture
- Preserve: FALLBACK_ASSET_ID value in the manifest loader


## Technical constraints
- The fallback id is passed in as a parameter, so the module does not import the node:fs-based loader


## Dependencies
- INT


## Definition of done
- resolveTextureKey is exported from game/src/engine/planPreload.ts


## Clarifying questions
- None
