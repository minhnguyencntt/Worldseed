---
id: "01M84WZ47Y1KGEPRSW570N8QXJ"
kind: requirement
parent: 01M84WZ47XPQ76F80J2AGZ7GBY
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · SceneObject entity renders one content object and tracks visibility

Context: objects carry asset, position, scale, layer and visibleWhen in content. Desired behavior: SceneObject created from an ObjectSpec and a RenderContext creates one sprite at the object's position, scale and layer depth, applies visibleWhen on sync(state), and releases the handle on destroy. Expected result: entity state follows game state. Why: objects become independently managed entities.

## Acceptance criteria
- Given an ObjectSpec, when SceneObject is constructed, then ctx.createSprite is called once with its asset key, position, scale and layer depth
- Given visibleWhen on a flag, when sync is called with the flag false then true, then the handle setVisible receives false then true
- Given a constructed entity, when destroy is called, then the handle destroy is called once


## Scope
- In scope: entities/SceneObject.ts
- Out of scope: hover and click handling
- Preserve: evaluateAll semantics


## Technical constraints
- Use evaluateAll from game/src/systems/conditions.ts
- No phaser import


## Dependencies
- REQ1


## Definition of done
- Entity tested with a fake RenderContext


## Clarifying questions
- None
