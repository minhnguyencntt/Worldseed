---
id: "01M84XZS821CXX68K1N68ZE9B2"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-5.3.1 · Scene start plays the authored fade transition

Context: bedroom.yaml authors a transition effect (fade, 400 ms) but buildEffects skips it and BootScene.create never calls EffectRenderContext.playTransition, so no fade plays. Desired behavior: scene start plays the fade using the content duration, and plays nothing when the scene has no transition entry. Why: the transition must be content-driven, as required by the layered scene renderer goal.

## Acceptance criteria
- Given a scene with a fade transition entry, when the scene starts, then playTransition is called once with the entry durationMs
- Given a scene with no transition entry, when the scene starts, then playTransition is never called


## Scope
- In scope: Engine helper that plays the authored transition
- In scope: BootScene.create wiring
- In scope: Unit tests with a mocked context
- Out of scope: New transition kinds
- Out of scope: Changing dust or ambientLight effects
- Out of scope: Changing the bedroom.yaml content
- Preserve: buildEffects skipping transition specs
- Preserve: createPhaserEffectContext.playTransition using cameras.main.fadeIn
- Preserve: Existing BootScene effect cleanup on SHUTDOWN


## Technical constraints
- Phaser 3.90 APIs only
- Engine code stays free of Phaser imports and uses the injected EffectRenderContext


## Definition of done
- Both requirements are met and their unit tests pass


## Clarifying questions
- None
