---
id: "01M84WZ47YP72RCFG79XJPZMRC"
kind: requirement
parent: 01M84WZ47XPQ76F80J2AGZ7GBY
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · buildScene creates all scene entities purely from content in layer order

Context: scenes are defined in YAML content. Desired behavior: buildScene(ctx, scene) creates one SceneObject per scene object and returns them sorted by layer depth, grouped by layer, using no hardcoded ids. Expected result: the bedroom content yields entities across furniture and objects layers in order. Why: scene construction is data-driven.

## Acceptance criteria
- Given a scene with objects on objects, furniture and background layers, when buildScene runs, then the returned list is ordered background, furniture, objects
- Given a scene, when buildScene runs, then ctx.createSprite is called exactly once per object
- Given an empty objects array, when buildScene runs, then it returns an empty result without error


## Scope
- In scope: engine/buildScene.ts
- Out of scope: asset preload
- Preserve: content schema


## Technical constraints
- Stable order within the same layer


## Dependencies
- REQ1
- REQ2


## Definition of done
- buildScene tested against fake context


## Clarifying questions
- None
