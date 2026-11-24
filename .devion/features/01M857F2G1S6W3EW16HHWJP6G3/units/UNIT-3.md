---
id: "01M857F2G2ADG411CX00R6W712"
kind: unit
parent: 01M857F2G20SHH6F1YFF2TYCWG
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Export SceneObjectSpec type from runtime content

Export a SceneObjectSpec type derived from SceneSpec so callers can type object callbacks.

## Acceptance criteria
- Given content.ts, When imported, Then SceneObjectSpec equals SceneSpec['objects'][number]
- Given runtime, When loaded, Then sceneSpec is unchanged


## Scope
- In scope: content.ts
- Out of scope: parsing
- Preserve: exports scene, sceneSpec, manifest, world


## Technical constraints
- Type-only export
- Code path: `game/frontend/src/runtime/content.ts`


## Definition of done
- Alias exported


## Clarifying questions
- None
