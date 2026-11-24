---
id: "01M856R3XHF1HXW7QZM0KR0W2H"
kind: requirement
parent: 01M856R3XHQWWDH0YBA35K36X1
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · BootScene builds its objects from content via buildScene with none hardcoded

Context: BootScene.create only builds effects. runtime/content.ts exports scene as an unvalidated SceneDef, while buildScene needs a SceneSpec. Desired behavior: content.ts also exports a schema-validated sceneSpec, and BootScene.create builds the objects with buildScene(createPhaserRenderContext(...), sceneSpec). Expected result: all objects come from bedroom.yaml. Why: the scene is content-driven.

## Acceptance criteria
- Given the bundled scene, when create runs, then buildScene is called once with sceneSpec and a context exposing createSprite
- Given BootScene.ts and renderContext.ts, when read as text, then no object id (bed, bookshelf, etc.) or asset id literal appears
- Given shutdown, when the SHUTDOWN callback runs, then destroy is called on every built SceneObject


## Scope
- In scope: content.ts sceneSpec export
- In scope: BootScene.create and shutdown wiring
- Out of scope: Changing bedroom.yaml
- Out of scope: State sync
- Preserve: scene export
- Preserve: effects and transition wiring
- Preserve: FALLBACK_KEY export


## Technical constraints
- Use sceneSchema from game/src/content/schema.ts for validation


## Dependencies
- R1


## Definition of done
- BootScene builds objects via buildScene only


## Clarifying questions
- None
