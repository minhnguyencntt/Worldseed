---
id: "01M855V4N174WC53KBTD8Z7YYF"
kind: requirement
parent: 01M855V4N1D6VPZ9JKZBKT7ZW1
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Texture keys resolve through resolveTextureKey with a fallback texture

Context: effectContext passes spec.asset directly to Phaser particles. Desired: BootScene generates a fallback texture keyed by FALLBACK_ASSET_ID, records ids whose load fails, and resolves every key via resolveTextureKey. Why: missing assets must not crash or show Phaser's missing texture.

## Acceptance criteria
- Given an id absent from the manifest, when resolved, then the fallback key is returned
- Given a loaderror for an id, when resolved, then the fallback key is returned
- Given a dust effect with a missing asset, when created, then particles use the fallback key


## Scope
- In scope: BootScene fallback generation and loaderror handling
- In scope: effectContext resolver parameter
- Out of scope: authored fallback art file
- Preserve: effect behavior for known assets


## Technical constraints
- FALLBACK_ASSET_ID from @game/assets/loaders/manifestLoader must not pull in node fs at runtime: define key via a literal 'fallback:missing' in BootScene


## Definition of done
- all texture keys resolved


## Clarifying questions
- None
