---
id: "01M855V4N1D6VPZ9JKZBKT7ZW1"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-5.4.2 BootScene preloads only planned assets with fallback texture

Context: planPreload and resolveTextureKey exist in game/src/engine/planPreload.ts but BootScene (game/frontend/src/phaser/BootScene.ts) has no preload and effectContext.ts passes spec.asset straight to Phaser. Desired behavior: BootScene loads only the planned assets, resolves every texture key through resolveTextureKey and uses a fallback texture for missing or invalid assets. Why: avoid loading unused assets and avoid crashes or green-box textures.

## Acceptance criteria
- Given the bedroom scene, when BootScene.preload runs, then only ids in planPreload(scene, manifest).load are queued with the loader
- Given an id not in the manifest or a file that fails to load, when a texture key is resolved, then the fallback texture key is returned and used
- Given the dust effect asset, when the effect is created, then its texture key comes from resolveTextureKey


## Scope
- In scope: BootScene.preload
- In scope: bundled manifest in runtime/content.ts
- In scope: effectContext key resolution
- In scope: runtime fallback texture
- Out of scope: new pixel-art files
- Out of scope: changing planPreload or resolveTextureKey
- Out of scope: backend
- Preserve: existing BootScene create/shutdown behavior
- Preserve: engine planPreload API


## Technical constraints
- Phaser 3.90 APIs only
- Engine code in game/src must not import Phaser


## Definition of done
- Both requirements verified by unit tests


## Clarifying questions
- None
