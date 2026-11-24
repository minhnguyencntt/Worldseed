---
id: "01M855M8266NY059ZY7SSJK91X"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-5.4.1 planPreload and resolveTextureKey engine functions

Context: a search of game/ for planPreload and resolveTextureKey returns nothing. The manifest loader (game/src/assets/loaders/manifestLoader.ts) already exports FALLBACK_ASSET_ID and checkAssetRefs. Desired behavior: a pure planPreload dedupes the asset ids a scene references and reports unknown references, and a pure resolveTextureKey returns the fallback asset id for unknown ids. Expected result: both functions are importable from game/src/engine. Why: the asset preload step (SG-5.4) needs them.

## Acceptance criteria
- Given a scene that references the same asset id more than once, when planPreload runs, then each known id appears once in the plan.
- Given a scene that references an id that is not in the manifest, when planPreload runs, then that id is reported as unknown.
- Given an id that is not in the manifest, when resolveTextureKey runs, then it returns the fallback asset id.


## Scope
- In scope: New pure engine module game/src/engine/planPreload.ts
- Out of scope: BootScene wiring
- Out of scope: Phaser loading calls
- Out of scope: Changes to the manifest loader
- Preserve: Existing engine modules and the manifest loader behavior


## Technical constraints
- No node:fs import in the engine module, because the frontend bundles engine code
- Reuse the AssetManifest, SceneDef and EffectSpec types


## Definition of done
- Both functions are exported from game/src/engine/planPreload.ts
- The game typecheck passes


## Clarifying questions
- None
