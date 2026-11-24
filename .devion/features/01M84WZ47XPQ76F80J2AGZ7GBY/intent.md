---
id: "01M84WZ47XPQ76F80J2AGZ7GBY"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-5.1 Layer order, render context, SceneObject and buildScene

Context: game/src has the layer enum (content/schema.ts), the object schema and getSceneView, but no layer ordering, render context, scene object entity or scene-building step. Desired behavior: add these as one sequenced change with no concurrent writers, so a scene is built only from content definitions into background, furniture, objects, characters, effects and ui layers. Expected result: buildScene(ctx, scene) creates one entity per content object at the depth of its layer. Why: lets future content changes add objects without touching the engine.

## Acceptance criteria
- Given the six layers, when LAYER_ORDER is read, then it equals background, furniture, objects, characters, effects, ui in that order
- Given a SceneSpec with objects on several layers, when buildScene runs, then one entity per object is created with depth ordered by layer
- Given no hardcoded object ids in engine code, when a new object is added to scene content, then buildScene creates it without code changes


## Scope
- In scope: game/src/engine layer order, render context and buildScene
- In scope: game/src/entities SceneObject
- Out of scope: Phaser scene wiring
- Out of scope: new art assets
- Out of scope: effects and transitions
- Preserve: getSceneView and performAction behavior
- Preserve: existing zod schemas


## Technical constraints
- Modules must not import phaser; the render context is an injected interface
- Reuse layerSchema, ObjectSpec and SceneSpec from game/src/content/schema.ts


## Definition of done
- All three requirements have Act and Verify units passing
- game typecheck passes


## Clarifying questions
- None
