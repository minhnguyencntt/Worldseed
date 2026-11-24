---
id: "01M855ASGRW00F7RAQ59KM5BX5"
kind: requirement
parent: 01M855ASGRMR9B70PK1JTY83JQ
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Pure preload planner and fallback resolver validate scene asset refs

A Phaser-free module game/src/engine/preload.ts builds a deduplicated load list from scene object assets and dust effect assets using the manifest, reports unknown ids via the existing checkAssetRefs, and resolves any key to the fallback id when it is unknown or failed to load.

## Acceptance criteria
- Given objects sharing one asset id, When planPreload runs, Then that asset appears once in the entries
- Given a ref not in the manifest, When planPreload runs, Then issues contains one entry naming the ref and entries omit it
- Given a key not in the loaded set, When resolveTextureKey runs, Then it returns FALLBACK_ASSET_ID


## Scope
- In scope: game/src/engine/preload.ts
- Out of scope: Phaser calls
- Preserve: checkAssetRefs and FALLBACK_ASSET_ID in manifestLoader.ts


## Technical constraints
- Reuse checkAssetRefs and FALLBACK_ASSET_ID from manifestLoader.ts, do not duplicate them


## Definition of done
- planPreload and resolveTextureKey exported and typed


## Clarifying questions
- None
