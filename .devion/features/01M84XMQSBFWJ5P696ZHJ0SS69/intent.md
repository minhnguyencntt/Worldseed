---
id: "01M84XMQSBFWJ5P696ZHJ0SS69"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-5.3 Wire dust, ambient light and fade transition from content

Context: game/src/engine/buildScene.ts builds only SceneObjects, and sceneSchema in game/src/content/schema.ts has no effects. Desired behavior: dust, ambient light and fade transition are authored in the scene YAML, created by the builder, and run by the Phaser BootScene. Expected result: effects exist because content declares them. Why: lets future AI cycles add effects without engine rewrites.

## Acceptance criteria
- Given a scene YAML with an effects list, when it is parsed, then dust, ambientLight and transition entries validate and invalid ones return path-named errors
- Given a scene with effects, when buildEffects runs, then effect entities are created on the effects layer depth and a fade transition is played
- Given BootScene.create runs, when the scene content declares effects, then they are created through a Phaser-backed context and removed on shutdown


## Scope
- In scope: effects schema
- In scope: buildEffects
- In scope: Phaser effect context
- In scope: BootScene wiring
- In scope: bedroom.yaml effects
- Out of scope: new art assets
- Out of scope: backend changes
- Out of scope: scene-to-scene navigation
- Preserve: buildScene return type and RenderContext interface
- Preserve: existing SceneObject behavior
- Preserve: Phaser 3.90 APIs


## Technical constraints
- Phaser 3.90 only
- Use existing assets effect:dust and effect:glow from manifest.json
- Keep Phaser out of game/src; runtime logic uses an injected context


## Definition of done
- All three requirements have Act and Verify units passing


## Clarifying questions
- None
