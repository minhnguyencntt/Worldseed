---
id: "01M84XZS83EHNAVNSAG5DTG41E"
kind: requirement
parent: 01M84XZS821CXX68K1N68ZE9B2
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · An engine helper plays the scene's authored fade via the render context

Context: src/engine/buildEffects.ts filters out transition specs and nothing else reads them. Desired behavior: a helper playSceneTransition(ctx, scene) finds the transition effect in scene.effects and calls ctx.playTransition(durationMs) once, or does nothing when absent. Expected result: the content duration reaches the context. Why: keeps the runtime free of hardcoded durations.

## Acceptance criteria
- Given a scene whose effects include {type:'transition',kind:'fade',durationMs:400}, when playSceneTransition runs, then ctx.playTransition is called once with 400
- Given a scene with effects but no transition entry, or no effects key, when playSceneTransition runs, then ctx.playTransition is not called


## Scope
- In scope: New helper in game/src/engine
- Out of scope: Phaser code
- Preserve: buildEffects behavior


## Technical constraints
- Use EffectRenderContext and SceneDef types from the engine and state modules


## Definition of done
- Helper exists and is covered by unit tests


## Clarifying questions
- None
