---
id: "01M8583P0BX3SGCQMBW8ZNG8J2"
kind: unit
parent: 01M8583P0B9Y1B69TJMAN3F6PH
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Export SceneObjectSpec type from runtime content

Export SceneObjectSpec derived from SceneSpec in content.ts so tests can annotate callbacks.

## Acceptance criteria
- Given content.ts, When imported as a type, Then SceneObjectSpec equals SceneSpec['objects'][number]
- Given content.ts runtime exports, When loaded, Then unchanged


## Scope
- In scope: content.ts
- Out of scope: tests
- Preserve: sceneSpec export


## Technical constraints
- Code path: `game/frontend/src/runtime/content.ts`


## Definition of done
- SceneObjectSpec exported


## Clarifying questions
- None
