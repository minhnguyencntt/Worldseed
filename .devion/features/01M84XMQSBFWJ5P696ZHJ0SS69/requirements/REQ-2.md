---
id: "01M84XMQSB9FF8F3ZWB2YANW9G"
kind: requirement
parent: 01M84XMQSBFWJ5P696ZHJ0SS69
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · buildEffects creates effect entities from scene content on the effects layer

Add EffectRenderContext and buildEffects so effects are created from content without Phaser imports, at the effects layer depth.

## Acceptance criteria
- Given scene.effects with dust, ambientLight and fade, when buildEffects runs, then createEffect is called for dust and light with depth layerDepth('effects') and playTransition once with durationMs
- Given no effects, when buildEffects runs, then nothing is created and an empty handle list returns
- Given the returned handles, when destroyed, then each effect handle destroy is called


## Scope
- In scope: game/src/engine/renderContext.ts
- In scope: game/src/engine/buildEffects.ts
- Out of scope: Phaser
- Preserve: RenderContext and buildScene unchanged


## Technical constraints
- No Phaser imports in game/src


## Definition of done
- buildEffects exported


## Clarifying questions
- None
