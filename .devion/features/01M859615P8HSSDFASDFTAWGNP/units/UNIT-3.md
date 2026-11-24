---
id: "01M859615QC1WMQXW8398W18GQ"
kind: unit
parent: 01M859615P114GZNH2TCVQA9EX
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Confirm hover, click and fallback paths in SceneObject and BootScene

Read SceneObject constructor/activate, planPreload.ts and BootScene.ts; keep FALLBACK_KEY, planPreload, resolveTextureKey exports intact.

## Acceptance criteria
- SceneObject registers onHover and onClick on the handle
- BootScene exports FALLBACK_KEY and resolves unknown ids to it


## Scope
- In scope: named exports
- Out of scope: behavior changes
- Preserve: signatures


## Technical constraints
- Code path: `game/src/entities/SceneObject.ts`
- Code path: `game/src/engine/planPreload.ts`
- Code path: `game/frontend/src/phaser/BootScene.ts`


## Dependencies
- REQ-C


## Definition of done
- exports confirmed, no behavior change


## Clarifying questions
- None
