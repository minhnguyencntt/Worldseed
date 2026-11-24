---
id: "01M85WR55B09M56HGJSSM4QQ43"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-3 Add lighting and atmosphere effects

Context: buildEffects (game/src/engine/buildEffects.ts) and createPhaserEffectContext (game/frontend/src/phaser/effectContext.ts) already support dust, ambientLight and transition effects. The bedroom scene declares only those. Desired behaviour: the bedroom also shows a moonlight shaft, lamp glow, light under the door and a soft vignette, all declared in content, drawn on the effects layer with palette colours, with dust using the generated effect:dust sprite, and every Phaser object destroyed on scene shutdown. Why: section 3.4 of the goal requires layered 2D lighting and particles.

## Acceptance criteria
- Given the bedroom scene content, when buildEffects runs with a mocked context, then createEffect is called once for each of dust, ambientLight, moonlightShaft, lampGlow, doorLight and vignette, with depth equal to layerDepth('effects')
- Given any created effect, when the scene shuts down, then destroy is called on every handle
- Given the bedroom scene content, when its effect colours are read, then each colour is a member of PALETTE


## Scope
- In scope: effect schema types
- In scope: bedroom effects content
- In scope: Phaser effect context
- In scope: destroy helper
- Out of scope: new rooms
- Out of scope: new story content
- Out of scope: backend changes
- Out of scope: audio
- Out of scope: deployment
- Out of scope: repository clean-up
- Preserve: Phaser 3.90.x pin
- Preserve: existing dust, ambientLight and transition behaviour
- Preserve: data-driven scene content
- Preserve: 480x270 resolution


## Technical constraints
- Phaser stays on 3.90.x
- Scene content stays data-driven: no effect position or asset id hardcoded in a scene class
- One shared palette of at most 48 colours
- Tests are unit tests with all dependencies mocked


## Definition of done
- All requirements delivered with Act and Verify units green


## Clarifying questions
- None
