---
id: "01M84Y610Y2QQFCNE90MN5HN1A"
kind: requirement
parent: 01M84Y610YC3J6G2MKCHEY6T6E
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · An engine helper plays the scene's authored fade with its content duration

Context: EffectSpec has a { type: 'transition', kind: 'fade', durationMs } variant (game/src/content/schema.ts L14) and SceneDef.effects holds it. Desired behavior: a pure engine helper finds the transition spec and calls ctx.playTransition(durationMs); it does nothing when absent. Expected result: the duration comes from content, never hardcoded. Why: keeps runtime separate from content.

## Acceptance criteria
- Given scene.effects contains a fade transition with durationMs 400, when playSceneTransition runs, then ctx.playTransition is called once with 400.
- Given scene.effects is undefined or has no transition entry, when playSceneTransition runs, then ctx.playTransition is never called.


## Scope
- In scope: New game/src/engine/playSceneTransition.ts
- Out of scope: Phaser-specific code
- Preserve: buildEffects behavior


## Technical constraints
- Use EffectRenderContext from game/src/engine/renderContext.ts


## Definition of done
- Helper exported and used by BootScene


## Clarifying questions
- None
