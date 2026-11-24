---
id: "01M84WBX7KGVHZY4TTYKTH2VA1"
kind: requirement
parent: 01M84WBX7KX6B33TTR8240BKV0
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Scene is built from content into entities on ordered layers

Context: SceneDef objects carry asset, position, scale and layer (content/schema.ts layerSchema: background, furniture, objects, characters, effects, ui). No code creates display objects from them. Desired behavior: a layer-order module plus an entity class and generic buildScene create one entity per visible object, at the content position and scale, with depth from the layer. Expected: bedroom.yaml objects render without any per-object code. Why: adding an object is a content edit.

## Acceptance criteria
- Given objects on layers background to ui, when buildScene runs, then depths are strictly increasing in the order background, furniture, objects, characters, effects, ui
- Given an ObjectDef with position and scale, when built, then the display handle is placed at that position with that scale
- Given an object whose visibleWhen fails, when built, then no entity is created for it
- Given a new object appended to scene content, when built, then an entity exists without any engine code change


## Scope
- In scope: engine/layers.ts
- In scope: engine/renderContext.ts
- In scope: entities/SceneObject.ts
- In scope: scenes/buildScene.ts
- In scope: frontend WorldScene adapter
- Out of scope: Hover/click behavior
- Out of scope: Effects and transitions
- Preserve: getSceneView visibility logic in engine/scene.ts


## Technical constraints
- Reuse getSceneView for visibility
- No object ids hardcoded in engine code


## Definition of done
- buildScene exported and typed
- WorldScene delegates to buildScene


## Clarifying questions
- None
