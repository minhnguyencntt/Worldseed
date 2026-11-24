---
id: "01M84Y610YC3J6G2MKCHEY6T6E"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-5.3.1 · Scene start plays the authored fade transition

Context: buildEffects (game/src/engine/buildEffects.ts) skips 'transition' effect specs and says they are played through ctx.playTransition, but nothing calls playTransition. BootScene.create (game/frontend/src/phaser/BootScene.ts) only builds effects, so no fade plays although bedroom.yaml authors a fade transition. Desired behavior: on scene start the authored fade is played with its content duration, and nothing is played when the scene has no transition entry. Why: the fade scene transition is part of the content-driven effects requirement.

## Acceptance criteria
- Given a scene with a fade transition entry of 400 ms, when the scene starts, then playTransition is called once with 400.
- Given a scene with no transition entry, when the scene starts, then playTransition is not called.


## Scope
- In scope: Engine helper that reads the transition entry and calls ctx.playTransition
- In scope: BootScene.create calling that helper
- In scope: Unit tests with a mocked effect context
- Out of scope: New transition kinds
- Out of scope: Changing the effects schema
- Out of scope: Changing the Phaser camera fade implementation
- Preserve: buildEffects keeps skipping transition specs
- Preserve: BootScene shutdown cleanup and sceneReady event


## Technical constraints
- Phaser 3.90
- Engine code in game/src/engine must not import Phaser; it uses EffectRenderContext


## Definition of done
- Both requirements have Act and Verify units merged and green


## Clarifying questions
- None
